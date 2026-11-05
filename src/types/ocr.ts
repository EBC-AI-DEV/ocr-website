export type OCRLanguage = "km" | "en" | "both";

export type OCRStatus = "idle" | "ready" | "processing" | "success" | "error";

export interface LanguageOption {
  value: OCRLanguage;
  label: string;
  description: string;
}

export interface UploadedFile {
  name: string;
  type: string;
  size: number;
  previewUrl: string;
}

export interface OCRResult {
  text: string;
  confidence?: number;
  language: OCRLanguage;
}

export interface OCRError {
  message: string;
  code?: string;
}
