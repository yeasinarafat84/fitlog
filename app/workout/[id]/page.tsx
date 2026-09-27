import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Flame, Star } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export const dynamic = "force-dynamic";

const SPEC_ROWS = (w: Awaited<ReturnType<typeof getWorkoutById>>) =>
  w
    ? [
        { label: "Equipment", value: w.equipment },
        { label: "Difficulty", value: w.difficulty },
        { label: "Sets", value: String(w.sets) },
        { label: "Reps", value: w.reps },
        { label: "Duration", value: `${w.duration} min` },
        { label: "Calories", value: `${w.caloriesBurned} kcal` },
        { label: "Rating", value: String(w.rating) },
      ]
    : [];

export default async function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const workout = await getWorkoutById(params.id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ink-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lime"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm font-semibold text-muted-light">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-lime" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-lime" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-lime text-lime" />
              {workout.rating}
            </span>
          </div>

          <dl className="mt-6 divide-y divide-ink-700 overflow-hidden rounded-xl border border-ink-700 bg-ink-900">
            {SPEC_ROWS(workout).map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <dt className="font-semibold uppercase tracking-wide text-muted">
                  {row.label}
                </dt>
                <dd className="font-semibold text-white">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-light">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-800 text-xs font-bold text-lime">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
