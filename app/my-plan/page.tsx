"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import StatCard from "@/components/StatCard";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone, hydrated } =
    usePlan();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("today");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllWorkouts()
      .then(setWorkouts)
      .finally(() => setLoading(false));
  }, []);

  const workoutMap = useMemo(() => {
    const map = new Map<number, Workout>();
    workouts.forEach((w) => map.set(w.id, w));
    return map;
  }, [workouts]);

  const planItems = useMemo(
    () =>
      plan
        .map((p) => ({ entry: p, workout: workoutMap.get(p.id) }))
        .filter((x): x is { entry: (typeof plan)[number]; workout: Workout } =>
          Boolean(x.workout)
        ),
    [plan, workoutMap]
  );

  const savedItems = useMemo(
    () =>
      saved
        .map((id) => workoutMap.get(id))
        .filter((w): w is Workout => Boolean(w)),
    [saved, workoutMap]
  );

  const activeList: Workout[] =
    tab === "today" ? planItems.map((p) => p.workout) : savedItems;

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeList;
    return activeList.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [activeList, query]);

  const metrics = useMemo(() => {
    return activeList.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + w.duration,
        calories: acc.calories + w.caloriesBurned,
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [activeList]);

  const showLoading = loading || !hydrated;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Exercises" value={metrics.exercises} />
        <StatCard label="Minutes" value={metrics.minutes} />
        <StatCard label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-lg border border-ink-700 bg-ink-900 p-1">
          <button
            type="button"
            onClick={() => setTab("today")}
            className={`rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === "today"
                ? "bg-lime text-ink-950"
                : "text-muted hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setTab("saved")}
            className={`rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === "saved"
                ? "bg-lime text-ink-950"
                : "text-muted hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {activeList.length > 0 && (
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search this list"
          />
        )}
      </div>

      <div className="mt-6">
        {showLoading && <Loader label="Loading workouts…" />}

        {!showLoading && activeList.length === 0 && <EmptyState />}

        {!showLoading && activeList.length > 0 && filteredList.length === 0 && (
          <p className="rounded-lg border border-ink-700 bg-ink-900 p-8 text-center text-sm text-muted">
            No lifts match &ldquo;{query}&rdquo;.
          </p>
        )}

        {!showLoading && filteredList.length > 0 && (
          <div className="flex flex-col gap-3">
            {filteredList.map((w) => {
              if (tab === "today") {
                const entry = planItems.find((p) => p.workout.id === w.id)!;
                return (
                  <PlanCard
                    key={w.id}
                    workout={w}
                    done={entry.entry.done}
                    onToggleDone={() => toggleDone(w.id)}
                    onRemove={() => removeFromPlan(w.id)}
                  />
                );
              }
              return (
                <PlanCard
                  key={w.id}
                  workout={w}
                  onRemove={() => removeFromSaved(w.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
