/**
 * zero based quarter numbers
 */
export type QuarterType = 0 | 1 | 2 | 3;

/**
 * takes a date and return the quarter it belongs to, which will be 0, 1, 2, or 3
 * @param date
 */
export const getDateQuarter = (date: Date): QuarterType => Math.floor(date.getUTCMonth() / 3) as QuarterType;

/**
 * takes a month (0 - 11) and return the quarter it belongs to, which will be 0, 1, 2, or 3
 * @param month
 */
export const getDateQuarterByMonth = (month: number): QuarterType => Math.floor(month / 3) as QuarterType;
