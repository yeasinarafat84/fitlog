import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-ink-600 bg-ink-900 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-800">
        <Dumbbell className="h-6 w-6 text-lime" />
      </div>
      <h3 className="font-display text-xl font-bold uppercase text-white">
        Nothing here yet
      </h3>
      <p className="max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03]"
      >
        Go to workouts
      </Link>
    </div>
  );
}
