import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-ink-700 bg-ink-900 transition-colors hover:border-lime/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ink-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lime"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs font-semibold text-muted-light">
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
    </Link>
  );
}
