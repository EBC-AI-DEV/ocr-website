// Zoom configuration
export const ZOOM_CONFIG = {
  MIN: 50,
  MAX: 200,
  STEP: 25,
  DEFAULT: 100,
} as const;

// Canvas rendering configuration
export const CANVAS_CONFIG = {
  STROKE_WIDTH: 2,
  FILL_OPACITY: 0.15,
  STROKE_COLOR: '#2563eb',
  FILL_COLOR: 'rgba(37, 99, 235, 0.15)',
} as const;

// Animation and timing configuration
export const ANIMATION_CONFIG = {
  RESIZE_DEBOUNCE: 250,
  IMAGE_LOAD_DELAY: 50,
  TOAST_DURATION: 3500,
  TRANSITION_DURATION: 200,
} as const;

// File upload configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10 MB
  MAX_FILENAME_LENGTH: 255,
  ACCEPTED_MIME_TYPES: {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'application/pdf': ['.pdf'],
  },
} as const;

// OCR processing configuration
export const OCR_CONFIG = {
  DEFAULT_RETRIES: 2,
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  RETRY_BACKOFF_BASE: 1000, // 1 second
} as const;
