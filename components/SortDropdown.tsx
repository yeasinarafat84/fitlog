"use client";

import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/types";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-by" className="sr-only">
        Sort by
      </label>
      <span className="pointer-events-none absolute left-3 text-xs font-semibold uppercase tracking-wide text-muted">
        Sort by
      </span>
      <select
        id="sort-by"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="appearance-none rounded-md border border-ink-600 bg-ink-900 py-2.5 pl-[5.5rem] pr-9 text-sm font-semibold text-white outline-none transition-colors focus:border-lime"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted" />
    </div>
  );
}
