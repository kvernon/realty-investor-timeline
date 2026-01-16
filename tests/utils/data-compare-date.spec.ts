import compareDates from '../../src/utils/data-compare-date';

describe('data-compare-date', () => {
  it('should return -1 when the first date is in an earlier year', () => {
    const datePrior = new Date('2022-01-01Z');
    const dateAfter = new Date('2023-01-01Z');
    expect(compareDates(datePrior, dateAfter)).toBe(-1);
  });

  it('should return 1 when the first date is in a later year', () => {
    const dateAfter = new Date('2024-01-01Z');
    const datePrior = new Date('2023-01-01Z');
    expect(compareDates(dateAfter, datePrior)).toBe(1);
  });

  it('should return -1 when the first date is in an earlier month within the same year', () => {
    const datePrior = new Date('2023-05-01Z');
    const dateAfter = new Date('2023-06-01Z');
    expect(compareDates(datePrior, dateAfter)).toBe(-1);
  });

  it('should return 1 when the first date is in a later month within the same year', () => {
    const dateAfter = new Date('2023-08-01Z');
    const datePrior = new Date('2023-02-01Z');
    expect(compareDates(dateAfter, datePrior)).toBe(1);
  });

  it('should return -1 when the first date is an earlier day within the same month', () => {
    const datePrior = new Date('2023-01-10Z');
    const dateB = new Date('2023-01-11Z');
    expect(compareDates(datePrior, dateB)).toBe(-1);
  });

  it('should return 1 when the first date is a later day within the same month', () => {
    const dateAfter = new Date('2023-01-25Z');
    const datePrior = new Date('2023-01-20Z');
    expect(compareDates(dateAfter, datePrior)).toBe(1);
  });

  it('should return 0 when both dates represent the same calendar day', () => {
    const dateA = new Date('2023-12-25T10:00:00Z');
    const dateB = new Date('2023-12-25T22:00:00Z');
    expect(compareDates(dateA, dateB)).toBe(0);
  });

  it('should be 1', () => {
    const created = new Date('2026-02-01T00:00:00.000Z');
    const date = new Date('2026-01-01T00:00:00.000Z');
    expect(compareDates(created, date)).toBe(1);
  });
});
