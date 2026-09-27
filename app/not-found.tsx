import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-lime sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase text-white sm:text-3xl">
        Set not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        That page isn&apos;t in the library. Head back and pick a lift to log.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to workouts
      </Link>
    </div>
  );
}
