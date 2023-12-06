import { DictionaryItem } from "../../util/dictionary-item";
export const terms: DictionaryItem[] = [
  {
    code: "MONTH_3",
    value: "3 мес.",
  },
  {
    code: "MONTH_6",
    value: "6 мес.",
  },
  {
    code: "MONTH_12",
    value: "12 мес.",
  },
  {
    code: "PERPETUAL",
    value: "Бессрочный",
  },
];

export const statuses: DictionaryItem[] = [
  {
    code: "NEW",
    value: "Новый",
  },
  {
    code: "APPROVED",
    value: "Одобрен",
  },
  {
    code: "ONCOMPENSATION",
    value: "На компенсации",
  },
  {
    code: "CLOSED",
    value: "Закрыт",
  },
  {
    code: "PAID",
    value: "Оплачен",
  },
];

export const types: DictionaryItem[] = [
  {
    code: "REVOCABLE",
    value: "Отзывный",
  },
  {
    code: "IRREVOCABLE",
    value: "Безотзывный",
  },
];

export const paymentTypes: DictionaryItem[] = [
  {
    code: "AUTO",
    value: "Автоматический",
  },
  {
    code: "MANUAL",
    value: "Ручной",
  },
];
