"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PlanEntry } from "@/lib/types";

const PLAN_KEY = "fitlog.plan";
const SAVED_KEY = "fitlog.saved";
const PLAN_CAP = 5;

interface Toast {
  id: number;
  message: string;
}

interface PlanContextValue {
  plan: PlanEntry[];
  saved: number[];
  planCount: number;
  savedCount: number;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isPlanFull: boolean;
  addToPlan: (id: number) => void;
  addToSaved: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
  toasts: Toast[];
  showToast: (message: string) => void;
  hydrated: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanEntry[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readStorage<PlanEntry[]>(PLAN_KEY, []));
    setSaved(readStorage<number[]>(SAVED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const showToast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const isInPlan = useCallback(
    (id: number) => plan.some((p) => p.id === id),
    [plan]
  );
  const isSaved = useCallback((id: number) => saved.includes(id), [saved]);

  const addToPlan = useCallback(
    (id: number) => {
      setPlan((prev) => {
        if (prev.some((p) => p.id === id)) {
          showToast("Already in today's plan");
          return prev;
        }
        if (prev.length >= PLAN_CAP) {
          showToast("Today's plan is full — 5 lift cap reached");
          return prev;
        }
        showToast("Added to today's plan");
        return [...prev, { id, done: false }];
      });
    },
    [showToast]
  );

  const addToSaved = useCallback(
    (id: number) => {
      setSaved((prev) => {
        if (prev.includes(id)) {
          showToast("Already saved for later");
          return prev;
        }
        showToast("Saved for later");
        return [...prev, id];
      });
    },
    [showToast]
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setPlan((prev) => prev.filter((p) => p.id !== id));
      showToast("Removed from today's plan");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSaved((prev) => prev.filter((s) => s !== id));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const toggleDone = useCallback(
    (id: number) => {
      setPlan((prev) =>
        prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
      );
      showToast("Marked as done");
    },
    [showToast]
  );

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      saved,
      planCount: plan.length,
      savedCount: saved.length,
      isInPlan,
      isSaved,
      isPlanFull: plan.length >= PLAN_CAP,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      toasts,
      showToast,
      hydrated,
    }),
    [
      plan,
      saved,
      isInPlan,
      isSaved,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      toasts,
      showToast,
      hydrated,
    ]
  );

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}

export const PLAN_CAP_SIZE = PLAN_CAP;
