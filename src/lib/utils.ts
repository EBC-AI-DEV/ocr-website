/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - The file size in bytes
 * @returns Formatted string (e.g., "2.5 MB", "150 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Gets a human-readable label for a file's MIME type
 * @param mimeType - The MIME type string
 * @param lang - Language code ("en" | "km")
 * @returns User-friendly label (e.g., "PDF", "Image", "Document")
 */
export function getFileTypeLabel(mimeType: string, lang: "en" | "km" = "en"): string {
  const isKm = lang === "km";
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType.startsWith("image/")) return isKm ? "រូបភាព" : "Image";
  return isKm ? "ឯកសារ" : "Document";
}

/**
 * Combines class names, filtering out falsy values
 * @param classes - Array of class names (strings, booleans, or undefined)
 * @returns Combined class name string
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns Debounced function
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Safely parses JSON with error handling
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback value
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Truncates a string to a maximum length with ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Extracts total page count from a PDF ArrayBuffer
 * @param buffer - ArrayBuffer of the PDF file
 * @returns Total number of pages (defaults to 1 if unknown)
 */
export function getPDFPageCount(buffer: ArrayBuffer): number {
  try {
    const text = new TextDecoder("latin1").decode(buffer);

    // Method 1: Look for root /Type /Pages ... /Count N or /Count N ... /Type /Pages
    const countMatches: number[] = [];

    const regexPagesCount = /\/Type\s*\/Pages\b[\s\S]{1,1000}?\/Count\s+(\d+)/g;
    let match: RegExpExecArray | null;
    while ((match = regexPagesCount.exec(text)) !== null) {
      countMatches.push(parseInt(match[1], 10));
    }

    const regexCountPages = /\/Count\s+(\d+)[\s\S]{1,1000}?\/Type\s*\/Pages\b/g;
    while ((match = regexCountPages.exec(text)) !== null) {
      countMatches.push(parseInt(match[1], 10));
    }

    if (countMatches.length > 0) {
      return Math.max(...countMatches);
    }

    // Method 2: Count page objects: /Type /Page (excluding /Pages)
    const pageMatches = text.match(/\/Type\s*\/Page\b(?!\s*s)/g);
    if (pageMatches && pageMatches.length > 0) {
      return pageMatches.length;
    }

    // Method 3: Fallback search for any /Count <num>
    const regexCount = /\/Count\s+(\d+)/g;
    while ((match = regexCount.exec(text)) !== null) {
      const val = parseInt(match[1], 10);
      if (val > 0 && val < 5000) {
        countMatches.push(val);
      }
    }

    if (countMatches.length > 0) {
      return Math.max(...countMatches);
    }
  } catch (error) {
    console.warn("Could not determine PDF page count:", error);
  }

  return 1;
}
