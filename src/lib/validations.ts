import { ocrConfig } from "@/config/site";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an uploaded file for OCR processing
 * @param file - The file to validate
 * @param lang - Language code ("en" | "km")
 * @returns Validation result with error message if invalid
 */
export function validateFile(file: File, lang: "en" | "km" = "en"): ValidationResult {
  const isKm = lang === "km";

  // Check if file exists
  if (!file) {
    return {
      valid: false,
      error: isKm
        ? "គ្មានឯកសារត្រូវបានជ្រើសរើសទេ។ សូមជ្រើសរើសឯកសារដើម្បីផ្ទុកឡើង។"
        : "No file provided. Please select a file to upload.",
    };
  }

  // Check if file has content
  if (file.size === 0) {
    return {
      valid: false,
      error: isKm
        ? "ឯកសារដែលបានជ្រើសរើសទទេ។ សូមជ្រើសរើសឯកសារត្រឹមត្រូវ។"
        : "The selected file is empty. Please choose a valid file.",
    };
  }

  // Check file type
  const acceptedTypes = Object.keys(ocrConfig.acceptedFormats);
  if (!acceptedTypes.includes(file.type)) {
    const supportedFormats = ocrConfig.formatLabels.join(", ");
    return {
      valid: false,
      error: isKm
        ? `ប្រភេទឯកសារមិនត្រូវបានគាំទ្រ។ សូមផ្ទុកឯកសារ ${supportedFormats}។`
        : `Unsupported file type. Please upload a ${supportedFormats} file.`,
    };
  }

  // Check file size
  if (file.size > ocrConfig.maxFileSize) {
    const maxSizeMB = (ocrConfig.maxFileSize / (1024 * 1024)).toFixed(0);
    const currentSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: isKm
        ? `ទំហំឯកសារ (${currentSizeMB}MB) លើសពីដែនកំណត់ ${maxSizeMB}MB។ សូមជ្រើសរើសឯកសារដែលតូចជាងនេះ។`
        : `File size (${currentSizeMB}MB) exceeds the ${maxSizeMB}MB limit. Please choose a smaller file.`,
    };
  }

  // Check filename length
  if (file.name.length > 255) {
    return {
      valid: false,
      error: isKm
        ? "ឈ្មោះឯកសារវែងពេក។ សូមប្តូរឈ្មោះឯកសារ ហើយព្យាយាមម្តងទៀត។"
        : "File name is too long. Please rename the file and try again.",
    };
  }

  // Check for suspicious file extensions
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension && ['exe', 'bat', 'cmd', 'sh', 'js'].includes(extension)) {
    return {
      valid: false,
      error: isKm
        ? "ឯកសារដែលអាចប្រតិបត្តិបាន (Executable) មិនត្រូវបានអនុញ្ញាតទេ ដោយសារហេតុផលសុវត្ថិភាព។"
        : "Executable files are not allowed for security reasons.",
    };
  }

  return { valid: true };
}

/**
 * Validates extracted OCR text
 * @param text - The extracted text to validate
 * @param lang - Language code ("en" | "km")
 * @returns Validation result
 */
export function validateOCRText(text: string, lang: "en" | "km" = "en"): ValidationResult {
  const isKm = lang === "km";

  if (!text || text.trim().length === 0) {
    return {
      valid: false,
      error: isKm
        ? "រកមិនឃើញអត្ថបទនៅក្នុងរូបភាពទេ។ សូមសាកល្បងរូបភាពដែលច្បាស់ជាងនេះ ឬឯកសារផ្សេង។"
        : "No text was detected in the image. Please try a clearer image or different file.",
    };
  }

  if (text.length > 100000) {
    return {
      valid: false,
      error: isKm
        ? "អត្ថបទដែលបានស្រង់មានទំហំធំពេក។ សូមសាកល្បងឯកសារដែលតូចជាងនេះ។"
        : "Extracted text is too large. Please try a smaller document.",
    };
  }

  return { valid: true };
}
