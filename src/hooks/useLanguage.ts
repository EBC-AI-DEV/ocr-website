"use client";

import { useContext } from "react";
import { LanguageContext, type LanguageContextValue } from "@/contexts/language-context";

/**
 * Access the current UI language and the type-safe `t()` function.
 *
 * ```tsx
 * const { language, setLanguage, t } = useLanguage();
 * t("nav.home");
 * ```
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
