import { LedgerItem } from '../src/ledger/ledger-item';
import { LedgerItemType } from '../src/ledger/ledger-item-type';
import { cloneDateUtc } from '../src/utils/data-clone-date';

describe('LedgerItem int tests', () => {
  describe('and dateLessThanOrEqualToAndQuarter', () => {
    let collection: LedgerItem[];
    const year = 2026;
    const started = new Date(Date.UTC(2026, 0, 1));
    const months = 12;

    beforeEach(() => {
      collection = [];
      const maxYears = [2025, year];

      for (let y = 0; y < maxYears.length; y++) {
        for (let i = 0; i < months; i++) {
          const l1 = new LedgerItem(
            (i + 1) * 10,
            LedgerItemType.Misc,
            cloneDateUtc(started, (date) => {
              date.setUTCFullYear(maxYears[y]);
              date.setUTCMonth(date.getUTCMonth() + i);
            }),
          );

          collection.push(l1);
        }
      }
    });

    test('should return full group', () => {
      for (let i = 2; i < months; i = i + 3) {
        const lastQtrDate = cloneDateUtc(started, (date) => {
          date.setUTCMonth(date.getUTCMonth() + i);
        });

        const filtered = collection.filter((l) => {
          return l.dateLessThanOrEqualToAndQuarter(lastQtrDate);
        });

        expect(filtered.length).toEqual(3);
        expect(filtered.map((x) => x.getYear())).toEqual(Array(3).fill(year));
      }
    });
    test('should return first 2 in group', () => {
      for (let i = 1; i < months / 4; i = i + 3) {
        const lastQtrDate = cloneDateUtc(started, (date) => {
          date.setUTCMonth(date.getUTCMonth() + i);
        });

        const possibleMonths = [lastQtrDate.getUTCMonth() - 1, lastQtrDate.getUTCMonth()];

        const filtered = collection.filter((l) => l.dateLessThanOrEqualToAndQuarter(lastQtrDate));
        const expectedItemsByQuarter = collection.filter((l) => {
          return l.getYear() === year && possibleMonths.some((mo) => mo === l.getMonth());
        });

        expect(filtered.length).toEqual(2);
        expect(filtered).toEqual(expectedItemsByQuarter);
        expect(filtered.length).toEqual(expectedItemsByQuarter.length);
      }
    });
  });
});
