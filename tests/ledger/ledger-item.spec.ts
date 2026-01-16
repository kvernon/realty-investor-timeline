import { LedgerItem } from '../../src/ledger/ledger-item';
import { cloneDateUtc } from '../../src/utils/data-clone-date';
import { LedgerItemType } from '../../src';
import { getDateQuarter, getDateQuarterByMonth } from '../../src/utils/get-date-quarter';
import compareDates from '../../src/utils/data-compare-date';

describe('LedgerItem unit tests', () => {
  let instance: LedgerItem;

  beforeEach(() => {
    instance = new LedgerItem();
  });

  afterEach(() => {
    instance = null;
  });

  describe('and dateMatchesYear', () => {
    describe('and no created', () => {
      test('should be false', () => {
        expect(instance.dateMatchesYear(new Date().getUTCFullYear())).toBeFalsy();
      });
      describe('and no today', () => {
        test('should be false', () => {
          expect(instance.dateMatchesYear(null)).toBeFalsy();
        });
      });
    });
    describe('and created', () => {
      beforeEach(() => {
        instance.created = new Date();
      });
      test('should be false', () => {
        const t = new Date();
        t.setUTCFullYear(2000);
        t.setUTCDate(1);
        t.setTime(0);

        expect(instance.dateMatchesYear(t.getUTCFullYear())).toBeFalsy();
      });
      test('should be true', () => {
        const t = new Date();
        expect(instance.dateMatchesYear(t.getUTCFullYear())).toBeTruthy();
      });
    });
  });
  describe('and dateMatchesYearAndMonth', () => {
    describe('and no created', () => {
      test('should be false', () => {
        expect(instance.dateMatchesYearAndMonth(new Date())).toBeFalsy();
      });
      describe('and no today', () => {
        test('should be false', () => {
          expect(instance.dateMatchesYearAndMonth(null)).toBeFalsy();
        });
      });
    });
    describe('and created', () => {
      beforeEach(() => {
        instance.created = new Date();
      });
      test('and different year, should be false', () => {
        const t = new Date();
        t.setUTCFullYear(2000);
        expect(instance.dateMatchesYearAndMonth(t)).toBeFalsy();
      });
      test('and different month, should be false', () => {
        const t = new Date();
        t.setUTCMonth(instance.getMonth() + 2);
        expect(instance.dateMatchesYearAndMonth(t)).toBeFalsy();
      });
      test('month and year same, should be true', () => {
        const t = new Date();
        expect(instance.dateMatchesYearAndMonth(t)).toBeTruthy();
      });
    });
  });
  describe('and dateLessThanOrEqualTo', () => {
    describe('and no created', () => {
      test('should be false', () => {
        expect(instance.dateLessThanOrEqualTo(cloneDateUtc(new Date()))).toBeFalsy();
      });
      describe('and no today', () => {
        test('should be false', () => {
          expect(instance.dateLessThanOrEqualTo(null)).toBeFalsy();
        });
      });
    });
    describe('and created', () => {
      beforeEach(() => {
        instance.created = cloneDateUtc(new Date(2026, 0, 1));
      });
      test('and year less, should be true', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCFullYear(2000);
        expect(instance.dateLessThanOrEqualTo(t)).toBeTruthy();
      });
      test('and month less, should be true', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCMonth(t.getUTCMonth() - 2);
        expect(instance.dateLessThanOrEqualTo(t)).toBeTruthy();
      });
      test('and month grater, should be false', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCMonth(t.getUTCMonth() + 2);
        expect(instance.dateLessThanOrEqualTo(t)).toBeFalsy();
      });
      test('month and year same, should be true', () => {
        const t = cloneDateUtc(instance.created);
        expect(instance.dateLessThanOrEqualTo(t)).toBeTruthy();
      });
    });
  });
  describe('and dateGreaterThanOrEqualTo', () => {
    describe('and no created', () => {
      test('should be false', () => {
        expect(instance.dateGreaterThanOrEqualTo(cloneDateUtc(new Date()))).toBeFalsy();
      });
      describe('and no today', () => {
        test('should be false', () => {
          expect(instance.dateGreaterThanOrEqualTo(null)).toBeFalsy();
        });
      });
    });
    describe('and created', () => {
      beforeEach(() => {
        instance.created = cloneDateUtc(new Date(2026, 0, 1));
      });
      test('and year less, should be false', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCFullYear(2000);
        expect(instance.dateGreaterThanOrEqualTo(t)).toBeFalsy();
      });
      test('and month less, should be false', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCMonth(t.getUTCMonth() - 2);
        expect(instance.dateGreaterThanOrEqualTo(t)).toBeFalsy();
      });
      test('and month grater, should be true', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCMonth(t.getUTCMonth() + 2);
        expect(instance.dateGreaterThanOrEqualTo(t)).toBeTruthy();
      });
      test('month and year same, should be true', () => {
        const t = cloneDateUtc(instance.created);
        expect(instance.dateGreaterThanOrEqualTo(t)).toBeTruthy();
      });
    });
  });
  describe('and dateNotGreaterThan', () => {
    describe('and no created', () => {
      test('should be false', () => {
        expect(instance.dateNotGreaterThan(cloneDateUtc(new Date()))).toBeFalsy();
      });
      describe('and no today', () => {
        test('should be false', () => {
          expect(instance.dateNotGreaterThan(null)).toBeFalsy();
        });
      });
    });
    describe('and created', () => {
      beforeEach(() => {
        instance.created = cloneDateUtc(new Date());
      });
      test('and year less, should be false', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCFullYear(2000);
        expect(instance.dateNotGreaterThan(t)).toBeFalsy();
      });
      test('and month less, should be false', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCMonth(t.getUTCMonth() - 2);
        expect(instance.dateNotGreaterThan(t)).toBeFalsy();
      });
      test('and month grater, should be true', () => {
        const t = cloneDateUtc(instance.created);
        t.setUTCMonth(t.getUTCMonth() + 2);
        expect(instance.dateNotGreaterThan(t)).toBeTruthy();
      });
      test('month and year same, should be true', () => {
        const t = cloneDateUtc(instance.created);
        expect(instance.dateNotGreaterThan(t)).toBeTruthy();
      });
    });
  });
  describe('and getYear', () => {
    describe('and no created', () => {
      test('should be -1', () => {
        expect(instance.getYear()).toEqual(-1);
      });
    });
    describe('and created', () => {
      test('should be match', () => {
        instance.created = new Date();
        expect(instance.getYear()).toEqual(instance.created.getUTCFullYear());
      });
    });
  });
  describe('and getMonth', () => {
    describe('and no created', () => {
      test('should be -1', () => {
        expect(instance.getMonth()).toEqual(-1);
      });
    });
    describe('and created', () => {
      test('should be match', () => {
        instance.created = new Date();
        expect(instance.getMonth()).toEqual(instance.created.getUTCMonth());
      });
    });
  });
  describe('and getQuarter', () => {
    describe('and no created', () => {
      test('should be -1', () => {
        expect(instance.getQuarter()).toEqual(-1);
      });
    });

    describe('and created', () => {
      describe('and first quarter', () => {
        test('should be 0', () => {
          instance.created = new Date(2026, 2, 1);
          expect(instance.getQuarter()).toEqual(0);
        });
      });

      describe('and second quarter', () => {
        test('should be 1', () => {
          instance.created = new Date(2026, 4, 1);
          expect(instance.getQuarter()).toEqual(1);
        });
      });
    });
  });
  describe('and dateMatchesYearAndQuarter', () => {
    describe('and no created', () => {
      test('should be -1', () => {
        expect(instance.dateMatchesYearAndQuarter(2025, 0)).toEqual(false);
      });
    });

    describe('and created', () => {
      describe('and year no match', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 2, 1);
          expect(instance.dateMatchesYearAndQuarter(2025, 1)).toEqual(false);
        });
      });

      describe('and quarter no match', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 2, 1);
          expect(instance.dateMatchesYearAndQuarter(2026, 1)).toEqual(false);
        });
      });

      describe('and quarter match', () => {
        test('should be true', () => {
          instance.created = new Date(2026, 6, 1);
          expect(instance.dateMatchesYearAndQuarter(2026, 2)).toEqual(true);
        });
      });

      describe('and filter example', () => {
        test('should return group', () => {
          const year = 2026;
          const started = new Date(year, 0, 1);
          const collection: LedgerItem[] = [];
          const months = 12;

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

          for (let i = 0; i < months; i++) {
            const dateQuarterByMonth = getDateQuarterByMonth(i);
            const filtered = collection.filter((l) => l.dateMatchesYearAndQuarter(year, dateQuarterByMonth));
            const expectedItemsByQuarter = collection.filter((l) => l.getQuarter() === dateQuarterByMonth && l.getYear() === year);

            expect(filtered.length).toEqual(3);
            expect(filtered.length).toEqual(expectedItemsByQuarter.length);
            expect(filtered).toEqual(expectedItemsByQuarter);
          }
        });
      });
    });
  });
  describe('and dateLessThanOrEqualToAndQuarter', () => {
    describe('and no created', () => {
      test('should be -1', () => {
        expect(instance.dateLessThanOrEqualToAndQuarter(undefined)).toEqual(false);
      });
    });

    describe('and created', () => {
      describe('and year no match', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 0, 1);
          expect(
            instance.dateLessThanOrEqualToAndQuarter(
              cloneDateUtc(instance.created, (date) => {
                date.setUTCFullYear(2024);
              }),
            ),
          ).toEqual(false);
        });
      });

      describe('and quarter no match', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 0, 1);
          const date = new Date(2026, 6, 1);
          expect(instance.dateLessThanOrEqualToAndQuarter(date)).toEqual(false);
        });
      });

      describe('and quarter match', () => {
        describe('and today and created are the same', () => {
          test('should be true', () => {
            instance.created = new Date(2026, 0, 1);
            expect(instance.dateLessThanOrEqualToAndQuarter(instance.created)).toEqual(true);
          });
        });

        describe('and date month is before created month', () => {
          test('should be false', () => {
            instance.created = new Date(2026, 1, 1);
            const date = new Date(2026, 0, 1);
            compareDates(instance.created, date); //?
            expect(instance.dateLessThanOrEqualToAndQuarter(date)).toEqual(false);
          });
        });

        describe('and date year is before', () => {
          test('should be true', () => {
            instance.created = new Date(2026, 1, 1);
            const date = new Date(2024, 0, 1);
            compareDates(instance.created, date); //?
            expect(instance.dateLessThanOrEqualToAndQuarter(date)).toEqual(false);
          });
        });

        describe('and date is after', () => {
          test('should be true', () => {
            instance.created = new Date(2026, 1, 1);
            const date = new Date(2026, 2, 1);
            expect(instance.dateLessThanOrEqualToAndQuarter(date)).toEqual(true);
          });
        });
      });
    });

    describe('and filter example', () => {
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
          }); //?

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
          }); //?

          const possibleMonths = [lastQtrDate.getUTCMonth() - 1, lastQtrDate.getUTCMonth()]; //?

          const filtered = collection.filter((l) => l.dateLessThanOrEqualToAndQuarter(lastQtrDate)); //?
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
});
