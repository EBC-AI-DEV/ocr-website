"use client";

import { useState, useCallback } from "react";
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

  const handleFileSelect = useCallback(
    (file: File) => {
      const validation = validateFile(file, language);

      if (!validation.valid) {
        const errorMsg = validation.error || (isKm ? "ឯកសារមិនត្រឹមត្រូវ" : "Invalid file");
        setError(errorMsg);
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
    if (uploadedFile?.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    setText("");
    setStatus("ready");
    setProgress(0);
  }, [uploadedFile]);

  const extractText = useCallback(async () => {
    if (!uploadedFile) {
      const errorMsg = isKm
        ? "សូមជ្រើសរើសរូបភាព ឬ PDF មុនពេលស្រង់អត្ថបទ។"
        : "Please choose an image or PDF before extracting text.";
      setError(errorMsg);
      setToast({ message: errorMsg, type: "warning" });
      return;
    }

    setError(null);
    setStatus("processing");
    setProgress(0);

    try {
      const { processOCR } = await import("@/services/ocr.service");

      const fileBlob = await fetch(uploadedFile.previewUrl).then((r) => r.blob());
      const file = new File([fileBlob], uploadedFile.name, { type: uploadedFile.type });

      const extractedText = await processOCR(file, "both");

      setText(extractedText);
      setStatus("success");
      setProgress(100);
      setToast({
        message: isKm ? "បានស្រង់អត្ថបទដោយជោគជ័យ" : "Text extracted successfully",
        type: "success",
      });
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error("OCR processing error:", err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : isKm
            ? "បរាជ័យក្នុងការស្រង់អត្ថបទ។ សូមព្យាយាមម្តងទៀត។"
            : "Failed to extract text. Please try again.";
      setError(errorMsg);
      setToast({ message: errorMsg, type: "error" });
      setStatus("ready");
      setProgress(0);
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
    copyText,
    downloadText,
    downloadWord,
    chooseAnotherFile,
    clearError,
    closeToast,
  };
}
