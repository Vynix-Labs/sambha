"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@sambha/ui/input";
import { HiPlus } from "react-icons/hi";
import { useAtom, useSetAtom } from "jotai";
import { isTypingAtom, messagesAtom } from "../../store/chatAtoms";
import { v4 as uuidv4 } from "uuid";

interface TextInputProps {
  userId: string;
}

export const TextInput = ({ userId }: TextInputProps) => {
  const [, setTypingMap] = useAtom(isTypingAtom);
  const setMessages = useSetAtom(messagesAtom);
  const [value, setValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    setTypingMap((prev) => ({ ...prev, [userId]: true }));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setTypingMap((prev) => ({ ...prev, [userId]: false }));
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    const newMessage = {
      id: uuidv4(),
      fromId: "me",
      toId: userId,
      message: value.trim(),
      timestamp: new Date().toISOString(),
      seen: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setValue("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <HiPlus />
      <Input
        placeholder="Type a message..."
        value={value}
        onChange={handleChange}
        className="flex-1"
      />
    </form>
  );
};
