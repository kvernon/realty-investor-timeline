/**
 * used to determine which is before, a or b. If a, then you'll get -1, if b then 1. Finally, if everything is the
 * same, then 0.
 * @param dateA
 * @param dateB
 */
export default function compareDates(dateA: Date, dateB: Date): number {
  if (dateA.getUTCFullYear() < dateB.getUTCFullYear()) {
    return -1;
  }

  if (dateA.getUTCFullYear() > dateB.getUTCFullYear()) {
    return 1;
  }

  if (dateA.getUTCMonth() < dateB.getUTCMonth()) {
    return -1;
  }

  if (dateA.getUTCMonth() > dateB.getUTCMonth()) {
    return 1;
  }

  if (dateA.getUTCDate() < dateB.getUTCDate()) {
    return -1;
  }

  if (dateA.getUTCDate() > dateB.getUTCDate()) {
    return 1;
  }

  return 0;
}
