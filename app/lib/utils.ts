// ─── Calendar Helpers ─────────────────────────────────────────────────────────

import { getStoredUser } from "./api";

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function getCalendarWeek(referenceDate: Date) {
  const day = referenceDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day; //biar minggu dimulai dari Senin, kalau hari Minggu (0) mundur 6 hari, kalau bukan, hitung mundur ke Senin (1-6)
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + mondayOffset);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export const getDisplayName = () => {
  const user = getStoredUser();
  return user?.display_name || user?.email?.split("@")[0] || "User";
};

export const formatDate = (value: string | null) => {
  if (!value) return "No due date";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}