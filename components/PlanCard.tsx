import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, CheckCircle2, X } from "lucide-react";
import { Workout } from "@/lib/types";

export default function PlanCard({
  workout,
  done,
  onToggleDone,
  onRemove,
}: {
  workout: Workout;
  done?: boolean;
  onToggleDone?: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border bg-ink-900 p-4 sm:flex-row sm:items-center ${
        done ? "border-lime/40" : "border-ink-700"
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-ink-800 sm:h-16 sm:w-16">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate font-display text-base font-bold uppercase ${
            done ? "text-muted line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1.5 flex items-center gap-3 text-xs font-semibold text-muted-light">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-lime" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-lime" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-lime text-lime" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-stretch sm:self-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="flex-1 rounded-md border border-ink-600 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-lime hover:text-lime sm:flex-none"
        >
          View Details
        </Link>
        {onToggleDone && (
          <button
            type="button"
            onClick={onToggleDone}
            aria-label={done ? "Mark as not done" : "Mark as done"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors ${
              done
                ? "border-lime bg-lime/10 text-lime"
                : "border-ink-600 text-muted hover:border-lime hover:text-lime"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-600 text-muted transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
