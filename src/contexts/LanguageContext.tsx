"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext, type LanguageContextValue } from "./language-context";
import { DEFAULT_LANGUAGE, isLanguage, translate } from "@/locales";
import type { Language, TranslateFn } from "@/types/language";

// Public API kept stable for existing imports from "@/contexts/LanguageContext".
export { useLanguage } from "@/hooks/useLanguage";
export type { Language } from "@/types/language";

const STORAGE_KEY = "language";

// NOTE (Phase 3): persistence and hydration handling below are intentionally
// unchanged from the original implementation. They will be replaced with
// cookie-based persistence, browser detection and a hydration-safe render.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLanguage(saved)) {
        return saved;
      }
    }
    return DEFAULT_LANGUAGE;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }, []);

  const t = useCallback<TranslateFn>(
    (key, ...args) => translate(language, key, ...args),
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </LanguageContext.Provider>
  );
}
