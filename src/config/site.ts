import { LanguageOption } from "@/types/ocr";

export const siteConfig = {
  name: "EBC OCR",
  title: "EBC OCR - Convert Khmer & English Documents to Text",
  description:
    "Turn any image or PDF into editable Khmer and English text—quickly, accurately, and securely. No account needed.",
  url: "https://ebcocr.com",
  email: "info@ebc.edu.kh",
} as const;

export const ocrConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10 MB
  maxPdfPages: 50, // Maximum allowed PDF pages per document
  acceptedFormats: {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "application/pdf": [".pdf"],
  },
  formatLabels: ["PNG", "JPG", "PDF"],
  languages: [
    { value: "km", label: "ខ្មែរ", description: "Khmer" },
    { value: "en", label: "English", description: "English" },
    { value: "both", label: "ខ្មែរ + EN", description: "Bilingual" },
  ] as LanguageOption[],
  demoText: `សូមស្វាគមន៍មកកាន់ EBC OCR

បច្ចេកវិទ្យា OCR របស់យើងជួយបម្លែងរូបភាព និងឯកសារ PDF ទៅជាអត្ថបទដែលអាចកែសម្រួលបានយ៉ាងរហ័ស និងត្រឹមត្រូវ។

Welcome to EBC OCR

Our OCR technology helps you convert images and PDF documents into editable text quickly and accurately.

Document reference: EBC-2026-0614`,
} as const;
