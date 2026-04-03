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
