import { NextResponse } from "next/server";
import { BOT_KNOWLEDGE } from "@/data/botKnowledge";

const MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    console.error("GROQ_API_KEY missing");
    return NextResponse.json(
      { reply: "Bot is not configured." },
      { status: 500 },
    );
  }

  try {
    const { message } = await req.json();
    const text = String(message ?? "").slice(0, 500);
    if (!text.trim()) {
      return NextResponse.json({ reply: "Say something 🙂" });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 1000,
        messages: [
          { role: "system", content: BOT_KNOWLEDGE },
          { role: "user", content: text },
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      console.error("Groq error:", res.status, await res.text());
      throw new Error(`groq ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content?.trim() || "No reply.",
    });
  } catch (err) {
    console.error("chat route failed:", err);
    return NextResponse.json(
      { reply: "Bot is offline right now. Try again later." },
      { status: 500 },
    );
  }
}
