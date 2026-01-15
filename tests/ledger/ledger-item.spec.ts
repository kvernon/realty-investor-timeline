import { LedgerItem } from '../../src/ledger/ledger-item';
import { cloneDateUtc } from '../../src/utils/data-clone-date';

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
        instance.created = cloneDateUtc(new Date());
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
    });
  });
  describe('and dateLessThanOrEqualToAndQuarter', () => {
    describe('and no created', () => {
      test('should be -1', () => {
        expect(instance.dateLessThanOrEqualToAndQuarter(instance.created, 0)).toEqual(false);
      });
    });

    describe('and created', () => {
      describe('and year no match', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 2, 1);
          expect(instance.dateLessThanOrEqualToAndQuarter(instance.created, 1)).toEqual(false);
        });
      });
      describe('and quarter no match', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 2, 1);
          expect(instance.dateLessThanOrEqualToAndQuarter(instance.created, 1)).toEqual(false);
        });
      });

      describe('and quarter match', () => {
        test('should be true', () => {
          instance.created = new Date(2026, 6, 1);
          expect(instance.dateLessThanOrEqualToAndQuarter(instance.created, 2)).toEqual(true);
        });
      });

      describe('and date outside', () => {
        test('should be false', () => {
          instance.created = new Date(2026, 6, 1);
          const outside = new Date(2026, 10, 1);
          expect(instance.dateLessThanOrEqualToAndQuarter(outside, 2)).toEqual(false);
        });
      });
    });
  });
});
