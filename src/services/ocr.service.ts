import { OCRLanguage } from "@/types/ocr";
import { cleanOCRText } from "@/lib/ocr-cleaner";

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
  const { retries = 2, timeout = 30000 } = options;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Unknown error occurred",
        }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.error || "OCR processing failed");
      }

      const extractedText = cleanOCRText(data.text);

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
