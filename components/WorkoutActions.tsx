"use client";

import { Bookmark, BookmarkCheck, PlusCircle, CheckCircle2 } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { isInPlan, isSaved, isPlanFull, addToPlan, addToSaved } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planDisabled = inPlan || (isPlanFull && !inPlan);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout.id)}
        disabled={planDisabled}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-lime px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {inPlan ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <PlusCircle className="h-4 w-4" />
        )}
        {inPlan
          ? "In today's plan"
          : isPlanFull
          ? "Plan full (5/5)"
          : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={() => addToSaved(workout.id)}
        disabled={saved}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-muted px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-lime hover:text-lime disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-muted disabled:hover:text-white"
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
