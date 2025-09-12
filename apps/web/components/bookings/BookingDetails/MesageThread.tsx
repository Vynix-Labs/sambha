"use client";

import React, { useState } from "react";

export type Message = {
  id: string;
  sender: "planner" | "vendor";
  text: string;
  time: string;
};

type Props = {
  initial?: Message[];
  onSend?: (m: Message) => void;
};

const MessageThread: React.FC<Props> = ({ initial = [], onSend }) => {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    const m: Message = {
      id: String(Date.now()),
      sender: "vendor",
      text: text.trim(),
      time: new Date().toISOString(),
    };
    const next = [...messages, m];
    setMessages(next);
    setText("");
    onSend?.(m);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="max-h-44 overflow-auto space-y-3 mb-3">
        {messages.length === 0 && (
          <p className="text-sm text-gray-400">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-md ${m.sender === "vendor" ? "bg-gray-50 self-end" : "bg-gray-100"}`}
          >
            <div className="text-sm text-gray-800">{m.text}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(m.time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 rounded-md border px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-md bg-[#7F56D9] text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageThread;
