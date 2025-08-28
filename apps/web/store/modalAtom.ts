import { atom } from "jotai";

export interface ModalState {
  isOpen: boolean;
  type?: string | null;
  data?: Record<string, any> | null;
  size?: "sm" | "md" | "lg" | "xl" | string;
}

export const modalAtom = atom<ModalState>({
  isOpen: false,
  type: null,
  data: null,
  size: "",
});
