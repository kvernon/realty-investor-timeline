/**
 * takes an existing date, and it creates a new UTC Date with YYYY/MM/01 focus. The time is removed
 * @param date
 * @param [datePredicate]
 */
export function cloneDateUtc(date: Date, datePredicate?: (date: Date) => void): Date {
  const result = new Date(Date.parse(date.toUTCString()));
  result.setUTCHours(0);
  result.setUTCMinutes(0);
  result.setUTCMilliseconds(0);
  result.setSeconds(0);

  if (datePredicate) {
    datePredicate(result);
  }

  return result;
}
