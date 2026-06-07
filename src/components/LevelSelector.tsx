"use client";

import type { HumanizeLevel } from "@/lib/prompts";

interface LevelSelectorProps {
  value: HumanizeLevel;
  onChange: (level: HumanizeLevel) => void;
  disabled: boolean;
}

const LEVELS: { key: HumanizeLevel; label: string; desc: string }[] = [
  { key: "light", label: "Light", desc: "Minor polish" },
  { key: "medium", label: "Medium", desc: "Standard humanization" },
  { key: "strong", label: "Strong", desc: "Deep transformation" },
];

export function LevelSelector({
  value,
  onChange,
  disabled,
}: LevelSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Humanize level
      </label>
      <div className="grid grid-cols-3 gap-2">
        {LEVELS.map(({ key, label, desc }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            disabled={disabled}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              value === key
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="block">{label}</span>
            <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
