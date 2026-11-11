import type {
  Dictionary,
  Language,
  PluralForms,
  TranslationArgs,
  TranslationKey,
  TranslationVars,
} from "@/types/language";
import { en } from "./en";
import { km } from "./km";

export const DEFAULT_LANGUAGE: Language = "en";

export const SUPPORTED_LANGUAGES: readonly Language[] = ["en", "km"];

/** BCP 47 locale used for number formatting and plural rules. */
export const LOCALES: Record<Language, string> = {
  en: "en-US",
  km: "km-KH",
};

export const dictionaries: Record<Language, Dictionary> = { en, km };

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

function isPluralForms(value: unknown): value is PluralForms {
  return typeof value === "object" && value !== null && typeof (value as PluralForms).other === "string";
}

function lookup(dictionary: Dictionary, key: string): unknown {
  let node: unknown = dictionary;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

const pluralRulesCache = new Map<string, Intl.PluralRules>();
const numberFormatCache = new Map<string, Intl.NumberFormat>();

function pluralRules(locale: string) {
  let rules = pluralRulesCache.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRulesCache.set(locale, rules);
  }
  return rules;
}

/** Formats a number for the given UI language (e.g. 1,250). */
export function formatNumber(value: number, language: Language): string {
  const locale = LOCALES[language];
  let format = numberFormatCache.get(locale);
  if (!format) {
    format = new Intl.NumberFormat(locale);
    numberFormatCache.set(locale, format);
  }
  return format.format(value);
}

function interpolate(template: string, vars: TranslationVars | undefined, language: Language) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    if (value === undefined) return match;
    return typeof value === "number" ? formatNumber(value, language) : value;
  });
}

function resolve(language: Language, key: string, vars: TranslationVars | undefined): string | undefined {
  const entry = lookup(dictionaries[language], key);

  if (typeof entry === "string") {
    return interpolate(entry, vars, language);
  }

  if (isPluralForms(entry)) {
    const count = Number(vars?.count ?? 0);
    const category = pluralRules(LOCALES[language]).select(count) as keyof PluralForms;
    return interpolate(entry[category] ?? entry.other, vars, language);
  }

  return undefined;
}

/**
 * Translates a key outside React (hooks, validation, services).
 * Falls back to English, then to the key itself, if a translation is missing.
 */
export function translate<K extends TranslationKey>(
  language: Language,
  key: K,
  ...args: TranslationArgs<K>
): string {
  const vars = args[0] as TranslationVars | undefined;
  const text = resolve(language, key, vars) ?? resolve(DEFAULT_LANGUAGE, key, vars);

  if (text === undefined) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] Missing translation key: "${key}"`);
    }
    return key;
  }

  return text;
}
