import { atom } from "jotai";
import {
  allMessages,
  users,
} from "../app/(dashboard)/event-planner/chats/data";
import { Host, User } from "../types/events/data";

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export const usersAtom = atom<Record<string, User>>(users);

export const groupsAtom = atom<Host[]>([]);

export const messagesAtom = atom(allMessages);

export const isTypingAtom = atom<Record<string, boolean>>({});
