"use client";

import { useRef } from "react";

const MAX_CHARS = 5000;

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function TextInput({ value, onChange, disabled }: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="space-y-2">
      <label
        htmlFor="text-input"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Paste AI-generated text
      </label>
      <textarea
        ref={textareaRef}
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste your AI-generated text here..."
        rows={10}
        maxLength={MAX_CHARS}
        className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
      <div className="flex justify-between text-xs text-zinc-500">
        <span>{value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters</span>
      </div>
    </div>
  );
}
