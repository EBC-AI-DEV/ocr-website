import type { en } from "@/locales/en";

/** UI languages supported by the site. */
export type Language = "en" | "km";

/**
 * Plural forms for a translation, selected with `Intl.PluralRules`.
 * `other` is required; Khmer only ever uses `other` because it has no
 * grammatical plural.
 */
export interface PluralForms {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  other: string;
}

type Leaf = string | PluralForms;

/** Shape every dictionary must follow: same keys as English, any text. */
export type Dictionary<T = typeof en> = {
  readonly [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends PluralForms
      ? PluralForms
      : Dictionary<T[K]>;
};

/** Dot-separated path to every translatable leaf, e.g. "nav.home". */
type LeafPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends Leaf
    ? `${Prefix}${K}`
    : LeafPaths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

/** Every valid translation key, generated from the English dictionary. */
export type TranslationKey = LeafPaths<typeof en>;

type PathValue<T, P extends string> = P extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? PathValue<T[Head], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/** Extracts `{name}` placeholders from a string literal type. */
type Placeholders<S> = S extends `${string}{${infer Name}}${infer Rest}`
  ? Name | Placeholders<Rest>
  : never;

type LeafVariables<V> = V extends string
  ? Placeholders<V>
  : V extends PluralForms
    ? "count" | Placeholders<V[keyof V]>
    : never;

/** Values that can be interpolated into a translation. */
export type TranslationValue = string | number;
export type TranslationVars = Record<string, TranslationValue>;

/**
 * Arguments accepted after the key. Keys whose English text contains
 * `{placeholders}` (or that are plural) require a matching `vars` object;
 * plain keys accept no variables.
 */
export type TranslationArgs<K extends TranslationKey> =
  [LeafVariables<PathValue<typeof en, K>>] extends [never]
    ? []
    : [vars: Record<LeafVariables<PathValue<typeof en, K>>, TranslationValue>];

export type TranslateFn = <K extends TranslationKey>(
  key: K,
  ...args: TranslationArgs<K>
) => string;
