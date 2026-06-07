import { HumanizeLevel } from "./prompts";

export const MODELS = {
  // Google AI models
  gemini: "gemini-2.5-flash",
} as const;

export type ModelKey = keyof typeof MODELS;

interface GoogleAIRequest {
  text: string;
  level: HumanizeLevel;
  systemPrompt: string;
  model?: string;
}

export async function streamHumanize({
  text,
  systemPrompt,
  model = "gemini-2.5-flash",
}: GoogleAIRequest): Promise<Response> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY is not set");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt },
            { text: `Humanize this text:\n\n${text}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "Unknown error");
    throw new Error(`Google AI API error ${response.status}: ${errBody}`);
  }

  return response;
}
