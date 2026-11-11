import { createContext } from "react";
import type { Language, TranslateFn } from "@/types/language";

export interface LanguageContextValue {
  /** Current UI language. Independent of the OCR output language. */
  language: Language;
  setLanguage: (language: Language) => void;
  /** Type-safe translation: `t("nav.home")`, `t("key", { count: 3 })`. */
  t: TranslateFn;
}

/**
 * The context object lives in its own module so the provider
 * (`LanguageContext.tsx`) and the hook (`hooks/useLanguage.ts`) can both
 * import it without a circular dependency.
 */
export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
