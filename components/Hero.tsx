import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-ink-700 bg-ink-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-lime">
            WORKOUT LIBRARY
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Browse workouts
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-lime/10 blur-3xl" />
          <Image
            src="/banner.png"
            alt="Gym equipment illustration"
            fill
            className="relative object-contain drop-shadow-[0_0_40px_rgba(204,255,0,0.15)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
