# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built for **B14-A6-Fit Log**. Browse a library of twelve lifts, drill into full workout details, and lock exercises into a daily training plan that tracks your minutes and calories as you go.

**Live Link:** _add your deployed URL here_
**GitHub Repository:** _add your repo URL here_

---

## 📖 Description

FitLog lets you pick a lift, lock it into today's plan, and watch the week's work add up. It pulls exercise data live from the FitLog API, renders a responsive workout library with search and sort, and lets you build a capped daily plan (5 lifts) or save workouts for later — all persisted locally so your plan survives a page reload.

## 🛠️ Technologies Used

- **Next.js 14** (App Router) — routing, server + client components, dynamic `/workout/[id]` pages
- **React 18** + **TypeScript**
- **Tailwind CSS** — styling, responsive layout, dark theme design tokens
- **lucide-react** — icon set (nav, stats, actions, toasts)
- **@fontsource/inter** & **@fontsource/oswald** — self-hosted body/display typefaces
- **Browser `localStorage`** — persisting Today's Plan and Saved lists across reloads
- **FitLog REST API** (`api.abcz.workers.dev`, with `api.api-store.workers.dev` as an automatic fallback)

## ✨ Key Features

1. **Live workout library** — a responsive 3×4 grid (collapsing to 2 and 1 columns on smaller screens) fetched from the FitLog API, each card showing image, category tags, equipment, and a duration/calorie/rating stats row.
2. **Search & sort** — instantly filter the library (or your plan) by name or muscle-group tag, and re-sort by Duration, Calories, or Rating via a dropdown.
3. **Detailed workout pages** — a two-column detail view per lift with a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
4. **Today's Plan with a 5-lift cap** — add workouts to a daily plan capped at five lifts, mark them done, or remove them; live-updating Exercises / Minutes / Calories summary cards; a separate Saved-for-later tab.
5. **Persistent state + toasts** — the plan and saved lists are stored in `localStorage` so they survive a refresh, and every add/remove/done action fires a toast notification plus updates the navbar's Plan and Saved badge counters.
6. **Resilient loading, empty, and error states** — a loading animation while data is fetched, a "Nothing here yet" empty state on My Plan, and a custom dark-themed 404 page for unknown routes.

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
app/                Routes: home, /workout/[id], /my-plan, 404
components/          UI components (Navbar, Hero, Library, cards, toasts...)
context/             PlanProvider — localStorage-backed plan/saved/toast state
lib/                 API client + shared TypeScript types
public/              logo.png, banner.png
```

---

© 2026 FitLog — Workout Library. Train hard, log honest.
