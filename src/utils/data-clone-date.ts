/**
 * takes an existing date, and it creates a new UTC Date with YYYY/MM/01 focus. The time is removed
 * @param date
 */
export default function cloneDateUtc(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}
