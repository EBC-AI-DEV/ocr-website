import { OCRLanguage, OCRStreamCallbacks, OCRStreamEvent } from "@/types/ocr";
import { cleanOCRText } from "@/lib/ocr-cleaner";
import { ocrConfig } from "@/config/site";
import { getPDFPageCount } from "@/lib/utils";

const OCR_ENDPOINT =
  process.env.NEXT_PUBLIC_OCR_API_URL || "https://ocr.ebc.edu.kh/api/ocr_api";

const OCR_STREAM_ENDPOINT =
  process.env.NEXT_PUBLIC_OCR_STREAM_API_URL ||
  "https://ocr.ebc.edu.kh/api/ocr_api?mode=events";

export interface OCRStreamOptions {
  timeout?: number;
  signal?: AbortSignal;
}

interface OCROptions {
  retries?: number;
  timeout?: number;
}

/**
 * Processes an image or PDF file through OCR and extracts text
 * @param file - The file to process (image or PDF)
 * @param language - Target language for OCR (km, en, or both)
 * @param options - Optional configuration for retry logic and timeout
 * @returns Promise that resolves to the extracted text
 * @throws Error if OCR processing fails after all retries
 */
export async function processOCR(
  file: File,
  language: OCRLanguage,
  options: OCROptions = {}
): Promise<string> {
  const isPDF =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (isPDF) {
    const buffer = await file.arrayBuffer();
    const pageCount = getPDFPageCount(buffer);
    if (pageCount > ocrConfig.maxPdfPages) {
      throw new Error(
        `PDF has ${pageCount} pages; the limit is ${ocrConfig.maxPdfPages}`
      );
    }
  }

  const { retries = 2, timeout = 30000 } = options;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("language", language);

      const response = await fetch(OCR_ENDPOINT, {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Unknown error occurred",
        }));
        throw new Error(
          errorData.error ||
            errorData.message ||
            errorData.msg ||
            `Server error: ${response.status}`
        );
      }

      const data = await response.json();

      if (typeof data.status === "boolean" && !data.status) {
        throw new Error(data.error || data.message || data.msg || "OCR processing failed");
      }

      const rawText =
        typeof data.msg === "string"
          ? data.msg
          : typeof data.text === "string"
            ? data.text
            : "";

      const extractedText = cleanOCRText(rawText);

      if (!extractedText) {
        return "No text detected in the image. Please try a clearer image or different file.";
      }

      return extractedText;
    } catch (error) {
      // If this is the last attempt, throw the error
      if (attempt === retries) {
        console.error("OCR Error after retries:", error);

        if (error instanceof Error) {
          // Handle specific error types
          if (error.name === "AbortError") {
            throw new Error(
              "Request timeout. The file may be too large or the server is busy. Please try again."
            );
          }
          throw error;
        }
        throw new Error("Failed to process OCR. Please try again.");
      }

      // Wait before retry with exponential backoff
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Failed to process OCR after multiple attempts.");
}

/**
 * Creates a text file blob from extracted text
 * @param text - The text content
 * @returns Blob object for download
 */
export function createTextFile(text: string): Blob {
  return new Blob([text], { type: "text/plain;charset=utf-8" });
}

/**
 * Creates a Word document blob from extracted text
 * @param text - The text content
 * @returns Blob object for download
 */
export function createWordFile(text: string): Blob {
  // Escape HTML entities to prevent XSS
  const escapedText = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  const content = `<html>
<head>
  <meta charset="utf-8">
  <meta name="generator" content="EBC OCR">
  <title>Extracted Text</title>
</head>
<body>
  <div style="white-space:pre-wrap;font-family:Arial,sans-serif;line-height:1.7;padding:20px;">
    ${escapedText}
  </div>
</body>
</html>`;

  return new Blob([content], {
    type: "application/msword;charset=utf-8",
  });
}

/**
 * Downloads a blob as a file
 * @param blob - The blob to download
 * @param filename - The name for the downloaded file
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Streams OCR results progressively for PDF (and other documents).
 * Reads the NDJSON event stream from the OCR API.
 *
 * @param file - The PDF or document file to process
 * @param callbacks - Event callbacks for progressive updates (token, line, done, error)
 * @param options - Configuration options (timeout, cancellation signal)
 * @returns Promise that resolves to the final extracted text
 */
export async function processOCRStream(
  file: File,
  callbacks: OCRStreamCallbacks = {},
  options: OCRStreamOptions = {}
): Promise<string> {
  const { timeout = 120000, signal: userSignal } = options;

  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  if (timeout > 0) {
    timeoutId = setTimeout(() => {
      controller.abort(
        new DOMException(
          "OCR processing timed out. The file may be too large or the server is busy. Please try again.",
          "TimeoutError"
        )
      );
    }, timeout);
  }

  const handleUserAbort = () => {
    controller.abort(
      userSignal?.reason ||
        new DOMException("OCR processing was cancelled by user.", "AbortError")
    );
  };

  if (userSignal) {
    if (userSignal.aborted) {
      handleUserAbort();
    } else {
      userSignal.addEventListener("abort", handleUserAbort, { once: true });
    }
  }

  // Enforce max PDF page limit (e.g. 50 pages)
  const isPDF =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (isPDF) {
    const buffer = await file.arrayBuffer();
    const pageCount = getPDFPageCount(buffer);
    if (pageCount > ocrConfig.maxPdfPages) {
      throw new Error(
        `PDF has ${pageCount} pages; the limit is ${ocrConfig.maxPdfPages}`
      );
    }
  }

  try {
    const formData = new FormData();
    // API specification: Form field must be "file"
    formData.append("file", file, file.name);

    callbacks.onStatusChange?.("uploading");

    const response = await fetch(OCR_STREAM_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "*/*",
      },
      // Note: Do not set Content-Type header so the browser includes boundary
      body: formData,
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error ||
          errorData.message ||
          errorData.msg ||
          errorMessage;
      } catch {
        const text = await response.text().catch(() => "");
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    if (!response.body) {
      throw new Error("OCR response body is empty or not readable.");
    }

    callbacks.onStatusChange?.("processing");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    const collectedLines: string[] = [];
    let doneEventReceived = false;
    let finalCompletedText = "";

    const handleEvent = (event: OCRStreamEvent) => {
      if (event.type === "token") {
        callbacks.onToken?.(event.text);
      } else if (event.type === "line") {
        callbacks.onStatusChange?.("streaming");
        collectedLines.push(event.text);
        callbacks.onLine?.(event.text, collectedLines);
      } else if (event.type === "done") {
        doneEventReceived = true;
        const cleaned = cleanOCRText(event.text);
        finalCompletedText = cleaned || event.text.trim();
        if (!finalCompletedText) {
          finalCompletedText =
            "No text detected in the document. Please try a clearer document or different file.";
        }
        callbacks.onDone?.(finalCompletedText);
      } else if (event.type === "error") {
        const errMsg =
          event.error ||
          event.message ||
          event.msg ||
          "OCR processing failed on server";
        throw new Error(errMsg);
      }
    };

    const processJsonLine = (rawLine: string) => {
      const trimmed = rawLine.trim();
      if (!trimmed) return;

      try {
        const event = JSON.parse(trimmed) as OCRStreamEvent;
        handleEvent(event);
      } catch {
        // Fallback: If multiple JSON objects are on one line without newline separation (e.g. `}{`)
        const jsonMatches = trimmed.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
        if (jsonMatches && jsonMatches.length > 0) {
          for (const match of jsonMatches) {
            try {
              const subEvent = JSON.parse(match) as OCRStreamEvent;
              handleEvent(subEvent);
            } catch (innerErr) {
              console.warn("Could not parse stream sub-chunk as JSON:", match, innerErr);
            }
          }
        } else {
          console.warn("Could not parse stream line as JSON:", trimmed);
        }
      }
    };

    while (true) {
      const { value, done } = await reader.read();

      if (value) {
        const chunk = decoder.decode(value, { stream: !done });
        buffer += chunk;
        const parts = buffer.split("\n");
        // The last element is either empty (if ended with \n) or an incomplete line
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          processJsonLine(part);
        }
      }

      if (done) {
        // Flush remaining buffer
        const remaining = decoder.decode();
        buffer += remaining;
        if (buffer.trim()) {
          processJsonLine(buffer.trim());
          buffer = "";
        }
        break;
      }
    }

    if (!doneEventReceived) {
      throw new Error(
        "OCR stream ended unexpectedly without receiving a completion event."
      );
    }

    return finalCompletedText;
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "AbortError" && userSignal?.aborted) {
        const cancelError = new DOMException("OCR processing cancelled.", "AbortError");
        callbacks.onError?.(cancelError);
        throw cancelError;
      }
      callbacks.onError?.(err);
      throw err;
    }
    const genericErr = new Error("Failed to process OCR stream.");
    callbacks.onError?.(genericErr);
    throw genericErr;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    if (userSignal) {
      userSignal.removeEventListener("abort", handleUserAbort);
    }
  }
}
