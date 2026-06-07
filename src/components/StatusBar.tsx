"use client";

interface StatusBarProps {
  status: "idle" | "loading" | "error" | "done";
  error?: string;
  onRetry?: () => void;
}

export function StatusBar({ status, error, onRetry }: StatusBarProps) {
  if (status === "idle") return null;

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        status === "loading"
          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
          : status === "error"
            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            : "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
      }`}
    >
      <div className="flex items-center gap-2">
        {status === "loading" && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {status === "error" && (
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {status === "done" && (
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="flex-1">
          {status === "loading" && "Humanizing your text..."}
          {status === "error" && (error ?? "Something went wrong.")}
          {status === "done" && "Done! Your humanized text is ready."}
        </span>
        {status === "error" && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-red-700 underline hover:no-underline dark:text-red-300"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
