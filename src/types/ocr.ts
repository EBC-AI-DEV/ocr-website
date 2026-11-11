export type OCRLanguage = "km" | "en" | "both";

export type OCRStatus =
  | "idle"
  | "ready"
  | "uploading"
  | "processing"
  | "streaming"
  | "completed"
  | "success"
  | "error"
  | "cancelled";

export type OCRStreamEventType = "token" | "line" | "done" | "error";

export interface OCRStreamTokenEvent {
  type: "token";
  text: string;
}

export interface OCRStreamLineEvent {
  type: "line";
  text: string;
}

export interface OCRStreamDoneEvent {
  type: "done";
  text: string;
}

export interface OCRStreamErrorEvent {
  type: "error";
  error?: string;
  message?: string;
  msg?: string;
}

export type OCRStreamEvent =
  | OCRStreamTokenEvent
  | OCRStreamLineEvent
  | OCRStreamDoneEvent
  | OCRStreamErrorEvent;

export interface OCRStreamCallbacks {
  onToken?: (text: string) => void;
  onLine?: (text: string, allLines: string[]) => void;
  onDone?: (fullText: string) => void;
  onError?: (error: Error) => void;
  onStatusChange?: (status: OCRStatus) => void;
}

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
