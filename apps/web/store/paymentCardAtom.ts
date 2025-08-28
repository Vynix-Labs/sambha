import { atom } from "jotai";

type Card = {
  id: string;
  name: string;
  number: string;
  userName: string;
  expiry: string;
  cvv: string;
  country: string;
};

export const getCardsAtom = atom<Card[]>([]);
