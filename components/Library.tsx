"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import SearchInput from "./SearchInput";
import Loader from "./Loader";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getAllWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : workouts;
    return [...filtered].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [workouts, sortKey, query]);

  return (
    <section id="library" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name or tag"
          />
          <SortDropdown value={sortKey} onChange={setSortKey} />
        </div>
      </div>

      <div className="mt-8">
        {loading && <Loader label="Loading workouts…" />}

        {!loading && error && (
          <p className="rounded-lg border border-ink-700 bg-ink-900 p-8 text-center text-sm text-muted">
            Couldn&apos;t load the library right now. Please try again in a
            moment.
          </p>
        )}

        {!loading && !error && visible.length === 0 && (
          <p className="rounded-lg border border-ink-700 bg-ink-900 p-8 text-center text-sm text-muted">
            No lifts match &ldquo;{query}&rdquo;.
          </p>
        )}

        {!loading && !error && visible.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
