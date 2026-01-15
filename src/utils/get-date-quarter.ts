/**
 * zero based quarter numbers
 */
export type QuarterType = 0 | 1 | 2 | 3;

/**
 * takes a date and return the quarter it belongs to, which will be 0, 1, 2, or 3
 * @param date
 */
export const getDateQuarter: (date: Date) => QuarterType = (date: Date) => Math.floor(date.getUTCMonth() / 3) as QuarterType;
