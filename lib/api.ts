import { Workout } from "./types";

const PRIMARY_BASE = "https://api.abcz.workers.dev/api/fitlog";
const FALLBACK_BASE = "https://api.api-store.workers.dev/api/fitlog";

async function fetchWithFallback(path: string): Promise<Response> {
  try {
    const res = await fetch(`${PRIMARY_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Primary API responded ${res.status}`);
    return res;
  } catch (err) {
    const res = await fetch(`${FALLBACK_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Fallback API responded ${res.status}`);
    return res;
  }
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetchWithFallback("");
  return res.json();
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const res = await fetchWithFallback(`/${id}`);
    const data = await res.json();
    if (!data || (Array.isArray(data) && data.length === 0)) return null;
    return Array.isArray(data) ? data[0] : data;
  } catch {
    return null;
  }
}
