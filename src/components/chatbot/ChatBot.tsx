"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/constant";
import ChatMessage, { Message, TypingIndicator } from "./ChatMessage";

const QUICK = ["Skills", "Experience", "Projects", "Contact"];

function getSessionId() {
  let id = localStorage.getItem("chat-session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat-session", id);
  }
  return id;
}

async function getReply(input: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input, sessionId: getSessionId() }),
  });
  const data = await res.json();
  return data.reply;
}

/* ---- message handler: swap this with a real API call later ---- */
// async function getReply(input: string): Promise<string> {
//   const t = input.toLowerCase();

//   // To use a backend instead, replace the body with:
//   // const res = await fetch("/api/chat", {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify({ message: input }),
//   // });
//   // return (await res.json()).reply;

//   await new Promise((r) => setTimeout(r, 700));

//   if (/(hi|hello|hey)\b/.test(t))
//     return "Hey! 👋 Ask me about Naveen's skills, experience, projects or how to contact him.";
//   if (t.includes("skill") || t.includes("stack") || t.includes("tech"))
//     return "React, TypeScript, Next.js, NestJS, MongoDB, Node.js, Tailwind, GSAP and Framer Motion.";
//   if (t.includes("experience") || t.includes("year"))
//     return "2+ years building full stack products, including ESG and compliance platforms.";
//   if (t.includes("project") || t.includes("work"))
//     return "Check the Projects section below 👇 — I can also help you reach out for details.";
//   if (t.includes("freelance") || t.includes("hire") || t.includes("available"))
//     return "Yes, Naveen is open to freelance and full-time opportunities.";
//   if (t.includes("contact") || t.includes("email") || t.includes("whatsapp"))
//     return `Email: ${CONTACT_EMAIL}\nWhatsApp: ${WHATSAPP_NUMBER}`;

//   return "Not sure about that one 😅 Try asking about skills, experience, projects or contact.";
// }

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi, I'm Naveen's assistant 🤖 How can I help?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = async (text: string) => {
    const msg = text.trim();
    if (!msg || typing) return;

    setMessages((m) => [
      ...m,
      { id: idRef.current++, role: "user", text: msg },
    ]);
    setInput("");
    setTyping(true);

    try {
      const reply = await getReply(msg);
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: "bot", text: reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          role: "bot",
          text: "Something went wrong. Try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] md:bottom-8 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 right-0 flex h-[480px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d0a24]/90 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.5)] backdrop-blur-xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="text-sm font-bold text-white">
                  Ask Naveen&apos;s bot
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/50 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* quick replies */}
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-violet-300/20 bg-white/[0.05] px-3 py-1 text-xs text-violet-200 transition hover:bg-white/10"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400/50"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="rounded-full bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
        className="glow-electric flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[oklch(0.72_0.21_250)] to-[oklch(0.68_0.25_300)] text-2xl text-white"
      >
        {open ? "✕" : "💬"}
      </motion.button>
    </div>
  );
}
