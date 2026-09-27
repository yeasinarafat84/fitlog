"use client";

import { CheckCircle2 } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function ToastStack() {
  const { toasts } = usePlan();

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-toast-in pointer-events-auto flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-850 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/40"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-lime" />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
