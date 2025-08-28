import { atom } from "jotai";
import {
  allMessages,
  users,
} from "../app/(dashboard)/event-planner/chats/data";

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export interface User {
  id: string;
  name: string;
  image: string;
  category: string;
  verified: boolean;
  rate?: string;
}

export const usersAtom = atom<Record<string, User>>(users);

export const messagesAtom = atom<Message[]>(allMessages);

export const isTypingAtom = atom<Record<string, boolean>>({});
