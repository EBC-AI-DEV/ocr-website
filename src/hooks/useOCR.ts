"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { OCRStatus, UploadedFile } from "@/types/ocr";
import { validateFile } from "@/lib/validations";
import { useLanguage } from "@/contexts/LanguageContext";
import { ToastType } from "@/components/ui/Toast";

export type ToastPayload = {
  message: string;
  type?: ToastType;
  title?: string;
} | string;

export function useOCR() {
  const { language } = useLanguage();
  const isKm = language === "km";

  const [status, setStatus] = useState<OCRStatus>("ready");
  const [text, setText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const [progress, setProgress] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Clean up any pending abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      // Abort any in-progress extraction
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      const validation = validateFile(file, language);

      if (!validation.valid) {
        const errorMsg = validation.error || (isKm ? "ឯកសារមិនត្រឹមត្រូវ" : "Invalid file");
        setError(errorMsg);
        setStatus("error");
        setToast({ message: errorMsg, type: "error" });
        return;
      }

      setError(null);

      const previewUrl = URL.createObjectURL(file);

      if (uploadedFile?.previewUrl) {
        URL.revokeObjectURL(uploadedFile.previewUrl);
      }

      setUploadedFile({
        name: file.name,
        type: file.type,
        size: file.size,
        previewUrl,
      });

      setText("");
      setStatus("ready");
      setProgress(0);
      setToast({
        message: isKm ? "បានផ្ទុកឯកសារដោយជោគជ័យ" : "File uploaded successfully",
        type: "success",
      });
    },
    [uploadedFile, language, isKm]
  );

  const removeFile = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (uploadedFile?.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    setText("");
    setStatus("ready");
    setProgress(0);
  }, [uploadedFile]);

  const cancelExtraction = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus("cancelled");
    setToast({
      message: isKm ? "បានបោះបង់ដំណើរការស្រង់អត្ថបទ" : "OCR processing cancelled",
      type: "info",
    });
  }, [isKm]);

  const extractText = useCallback(async () => {
    if (!uploadedFile) {
      const errorMsg = isKm
        ? "សូមជ្រើសរើសរូបភាព ឬ PDF មុនពេលស្រង់អត្ថបទ។"
        : "Please choose an image or PDF before extracting text.";
      setError(errorMsg);
      setToast({ message: errorMsg, type: "warning" });
      return;
    }

    // Cancel any previous run
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setError(null);
    setStatus("uploading");
    setProgress(10);
    setText("");

    // Scroll to results section so user sees streaming in real-time
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    try {
      const fileBlob = await fetch(uploadedFile.previewUrl).then((r) => r.blob());
      const file = new File([fileBlob], uploadedFile.name, { type: uploadedFile.type });

      const isPDF =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (isPDF) {
        // PDF OCR Streaming Integration
        const { processOCRStream } = await import("@/services/ocr.service");

        const finalText = await processOCRStream(
          file,
          {
            onStatusChange: (newStatus) => {
              if (!controller.signal.aborted) {
                setStatus(newStatus);
              }
            },
            onLine: (_lineText, allLines) => {
              if (!controller.signal.aborted) {
                // Progressive line rendering (without token duplication)
                setText(allLines.join("\n"));
                setStatus("streaming");
                setProgress((prev) => Math.min(prev + 5, 90));
              }
            },
            onDone: (doneText) => {
              if (!controller.signal.aborted) {
                setText(doneText);
                setStatus("completed");
                setProgress(100);
              }
            },
          },
          {
            signal: controller.signal,
            timeout: 120000,
          }
        );

        if (controller.signal.aborted) {
          setStatus("cancelled");
          return;
        }

        setText(finalText);
        setStatus("completed");
        setProgress(100);
      } else {
        // Existing image OCR (PNG / JPG) functionality preserved
        setStatus("processing");
        setProgress(30);

        const { processOCR } = await import("@/services/ocr.service");
        const extractedText = await processOCR(file, "both", {
          timeout: 45000,
        });

        if (controller.signal.aborted) {
          setStatus("cancelled");
          return;
        }

        setText(extractedText);
        setStatus("completed");
        setProgress(100);
      }

      setToast({
        message: isKm ? "បានស្រង់អត្ថបទដោយជោគជ័យ" : "Text extracted successfully",
        type: "success",
      });
    } catch (err: unknown) {
      if (
        controller.signal.aborted ||
        (err instanceof DOMException && err.name === "AbortError")
      ) {
        setStatus("cancelled");
        return;
      }

      console.error("OCR processing error:", err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : isKm
            ? "បរាជ័យក្នុងការស្រង់អត្ថបទ។ សូមព្យាយាមម្តងទៀត។"
            : "Failed to extract text. Please try again.";

      setError(errorMsg);
      setToast({ message: errorMsg, type: "error" });
      setStatus("error");
      setProgress(0);
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, [uploadedFile, isKm]);

  const copyText = useCallback(async () => {
    if (!text) return;
    await navigator.clipboard?.writeText(text);
    setToast({
      message: isKm ? "បានចម្លងអត្ថបទទៅក្តារតម្បៀតខ្ទាស់" : "Text copied to clipboard",
      type: "success",
    });
  }, [text, isKm]);

  const downloadText = useCallback(() => {
    if (!text) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" })
    );
    link.download = "EBC-OCR-extracted-text.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    setToast({
      message: isKm ? "បានទាញយកឯកសារ TXT" : "TXT file downloaded",
      type: "success",
    });
  }, [text, isKm]);

  const downloadWord = useCallback(() => {
    if (!text) return;
    const content = `<html><head><meta charset="utf-8"></head><body><div style="white-space:pre-wrap;font-family:Arial,sans-serif;line-height:1.7">${text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")}</div></body></html>`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([content], { type: "application/msword;charset=utf-8" })
    );
    link.download = "EBC-OCR-extracted-text.doc";
    link.click();
    URL.revokeObjectURL(link.href);
    setToast({
      message: isKm ? "បានទាញយកឯកសារ Word" : "Word document downloaded",
      type: "success",
    });
  }, [text, isKm]);

  const chooseAnotherFile = useCallback(() => {
    if (uploadedFile?.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    setText("");
    setStatus("ready");
    setProgress(0);
  }, [uploadedFile]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    status,
    text,
    setText,
    uploadedFile,
    error,
    toast,
    progress,
    handleFileSelect,
    removeFile,
    extractText,
    cancelExtraction,
    copyText,
    downloadText,
    downloadWord,
    chooseAnotherFile,
    clearError,
    closeToast,
  };
}
