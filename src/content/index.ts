import type { Locale } from "@/data/types";
import { pl } from "./pl/ui";
import { en } from "./en/ui";

export type Dictionary = typeof pl;

const dictionaries: Record<Locale, Dictionary> = { pl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
