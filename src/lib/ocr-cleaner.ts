/**
 * OCR Text Normalization & Cleaning Utilities
 *
 * Cleans common OCR tokenization artifacts, including:
 * - Detached apostrophes and contractions (e.g. "life' s" -> "life's", "don' t" -> "don't")
 * - Stray spaces preceding punctuation marks (e.g. "word ," -> "word,")
 * - Khmer punctuation attachment (e.g. "អត្ថបទ ។" -> "អត្ថបទ។")
 * - Broken end-of-line hyphens (e.g. "possi-\nbilities" -> "possibilities")
 * - Loose spaces inside brackets and quotation marks
 * - Redundant consecutive whitespace and blank lines
 */

export function cleanOCRText(str: string | null | undefined): string {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str
    // Normalize CRLF to LF
    .replace(/\r\n/g, "\n")
    // Fix hyphenated line breaks in words: "possi-\n bilities" -> "possibilities"
    .replace(/(\b[A-Za-z]+)-\s*\n\s*([A-Za-z]+\b)/g, "$1$2")
    // Fix detached contractions and possessives: "life' s" -> "life's", "don ' t" -> "don't"
    .replace(/(\b[A-Za-z0-9]+)\s*['’`‘]\s*([A-Za-z]+\b)/g, "$1'$2")
    // Fix spaces before English punctuation: "word ," -> "word,"
    .replace(/([^\s\d])\s+([,.:;?!])(?=\s|$)/g, "$1$2")
    // Fix spaces before Khmer punctuation: "ពាក្យ ។" -> "ពាក្យ។"
    .replace(/\s+([។៕ៗ៛])/g, "$1")
    // Fix spaces inside parentheses: "( word )" -> "(word)"
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    // Fix spaces inside brackets: "[ word ]" -> "[word]"
    .replace(/\[\s+/g, "[")
    .replace(/\s+\]/g, "]")
    // Fix spaces inside smart quotes
    .replace(/“\s+/g, "“")
    .replace(/\s+”/g, "”")
    // Collapse multiple horizontal spaces to single space
    .replace(/[^\S\n]{2,}/g, " ")
    // Collapse 3 or more consecutive newlines to 2 newlines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Returns the estimated word count for display in the editor status bar.
 */
export function getWordCount(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Returns character count.
 */
export function getCharacterCount(text: string): number {
  return text.length;
}

