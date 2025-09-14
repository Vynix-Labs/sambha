// components/bookings/MessageThread.tsx
"use client";

import React, { useState } from "react";
import { Message } from "../../types/booking";

type Props = {
  initial?: Message[];
};

const MessageThread: React.FC<Props> = ({ initial = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    const m: Message = {
      id: String(Date.now()),
      sender: "vendor",
      text: text.trim(),
      time: new Date().toISOString(),
    };
    setMessages((p) => [...p, m]);
    setText("");
  };

  return (
    <div className="mt-8 bg-white p-4 rounded-lg border border-gray-100">
      <div className="max-h-48 overflow-auto space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-md ${m.sender === "vendor" ? "bg-gray-50 self-end" : "bg-gray-100"}`}
            >
              <div className="text-sm">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(m.time).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 rounded-md border px-3 py-2"
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-md bg-[#7F56D9] text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageThread;
