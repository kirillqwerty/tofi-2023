import {DictionaryItem} from "./dictionary-item";

export function getDictionaryValue(dictionary: DictionaryItem[], code?: string): string {
  return dictionary.find((item) => item.code === code)?.value || "";
}
