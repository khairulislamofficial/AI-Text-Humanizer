import { NextRequest } from "next/server";
import { buildPrompt, HumanizeLevel } from "@/lib/prompts";
import { streamHumanize } from "@/lib/openrouter";

export const runtime = "edge";

const MAX_CHARS = 5000;

export async function POST(req: NextRequest) {
  try {
    const { text, level } = (await req.json()) as {
      text?: string;
      level?: HumanizeLevel;
    };

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (text.length > MAX_CHARS) {
      return new Response(
        JSON.stringify({ error: `Text exceeds ${MAX_CHARS} characters` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const sanitizedLevel: HumanizeLevel =
      level === "light" || level === "medium" || level === "strong"
        ? level
        : "medium";

    const systemPrompt = buildPrompt(sanitizedLevel);
    const aiResponse = await streamHumanize({
      text,
      level: sanitizedLevel,
      systemPrompt,
    });

    return new Response(aiResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
