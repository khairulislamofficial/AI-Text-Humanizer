"use client";

import { useCallback } from "react";

interface TextOutputProps {
  value: string;
  isLoading: boolean;
}

export function TextOutput({ value, isLoading }: TextOutputProps) {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
  }, [value]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "humanized-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [value]);

  if (!value && !isLoading) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Humanized text
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!value}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Download
          </button>
        </div>
      </div>
      <div
        className="min-h-[120px] whitespace-pre-wrap rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        {isLoading && !value && (
          <span className="text-zinc-400 italic">Waiting for response...</span>
        )}
        {value}
        {isLoading && value && (
          <span className="inline-block h-4 w-1 animate-pulse bg-blue-500 ml-0.5" />
        )}
      </div>
    </div>
  );
}
