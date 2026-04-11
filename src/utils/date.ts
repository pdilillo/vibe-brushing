/** True if `lastSessionDate` falls on the same local calendar day as `now` (default: today). */
export function hasBrushedToday(
  lastSessionDate?: Date | string | null,
  now: Date = new Date()
): boolean {
  if (lastSessionDate == null) return false;
  const d = typeof lastSessionDate === 'string' ? new Date(lastSessionDate) : lastSessionDate;
  if (Number.isNaN(d.getTime())) return false;
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/** Local calendar date as YYYY-MM-DD (for streak stamps and comparisons). */
export function formatLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Whole calendar days from date `a` to `b` (local midnight to midnight). */
export function calendarDaysBetween(a: Date, b: Date): number {
  const a0 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const b0 = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((b0.getTime() - a0.getTime()) / (1000 * 60 * 60 * 24));
}
