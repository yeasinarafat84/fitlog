export default function Loader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-ink-700" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-lime" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}
