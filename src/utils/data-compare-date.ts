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
