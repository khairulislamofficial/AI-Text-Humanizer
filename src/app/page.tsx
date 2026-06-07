"use client";

import { useState, useRef, useCallback } from "react";
import { TextInput } from "@/components/TextInput";
import { LevelSelector } from "@/components/LevelSelector";
import { StatusBar } from "@/components/StatusBar";
import { TextOutput } from "@/components/TextOutput";
import type { HumanizeLevel } from "@/lib/prompts";

type Status = "idle" | "loading" | "error" | "done";

export default function Home() {
  const [text, setText] = useState("");
  const [level, setLevel] = useState<HumanizeLevel>("medium");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const handleHumanize = useCallback(async () => {
    if (!text.trim()) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setOutput("");
    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error ?? `Server error (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";

      while (!done) {
        const { done: isDone, value } = await reader.read();
        done = isDone;

        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            // Gemini SSE format: "data: {...}" — strip the "data: " prefix
            const jsonStr = trimmed.startsWith("data: ")
              ? trimmed.slice(6)
              : trimmed;

            // Error array format: [{ "error": { ... } }]
            if (jsonStr.startsWith("[")) {
              try {
                const errArr = JSON.parse(jsonStr);
                const msg = errArr[0]?.error?.message ?? "Unknown error";
                setError(msg);
                setStatus("error");
              } catch {
                // skip
              }
              done = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              // Gemini returns cumulative text: candidates[0].content.parts[0].text
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) setOutput(text); // SET directly, don't append
              // Stop if finish reason is set
              if (parsed.candidates?.[0]?.finishReason === "STOP") {
                done = true;
                break;
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      setStatus("done");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setStatus("error");
    }
  }, [text, level]);

  const handleRetry = useCallback(() => {
    handleHumanize();
  }, [handleHumanize]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            AI Text Humanizer
          </h1>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Powered by Google Gemini 3.5 Flash
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8">
        <TextInput value={text} onChange={setText} disabled={status === "loading"} />

        <LevelSelector value={level} onChange={setLevel} disabled={status === "loading"} />

        <button
          type="button"
          onClick={handleHumanize}
          disabled={!text.trim() || status === "loading"}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Humanizing..." : "Humanize"}
        </button>

        <StatusBar status={status} error={error} onRetry={handleRetry} />

        <TextOutput value={output} isLoading={status === "loading"} />
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 py-4 text-center text-xs text-zinc-500">
          AI Text Humanizer &mdash; No data stored. All processing is ephemeral.
        </div>
      </footer>
    </div>
  );
}
