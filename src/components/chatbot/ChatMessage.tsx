"use client";

import { motion } from "framer-motion";

export type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] text-white"
            : "rounded-bl-sm border border-white/10 bg-white/[0.06] text-white/85"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-violet-300"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
