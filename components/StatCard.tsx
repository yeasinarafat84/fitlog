export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-900 p-5 text-center sm:text-left">
      <p className="font-display text-3xl font-bold text-lime sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}
