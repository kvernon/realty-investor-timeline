import { ValueCache } from '../../src/caching/value-cache';

class ProtectValueCache<T> extends ValueCache<T> {
  public getRawValue(): unknown {
    return this._value;
  }
}

describe('ValueCache tests', () => {
  let today: Date;
  let monthDayYearOnly: Date;

  beforeEach(() => {
    today = new Date(Date.now());
    monthDayYearOnly = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  });

  describe('and getValue', () => {
    describe('and expire date null', () => {
      test('should return set value', () => {
        const expire = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate());

        const rc = new ValueCache(null, [], 1);
        const expected = [''];
        rc.setValue(expected, expire);
        expect(rc.getValue(expire)).toEqual(expected);
      });
    });

    describe('and expire date set', () => {
      describe('and current date future', () => {
        test('should return set value', () => {
          const expire = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate());

          const rc = new ValueCache(expire, [], 1);
          const expected = [''];
          rc.setValue(expected, expire);
          expect(rc.getValue(monthDayYearOnly)).toEqual(expected);
        });

        test('should return set value with changes', () => {
          const expire = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate());

          const defaultValue: string[] = [];
          const rc = new ValueCache(expire, defaultValue, 1);

          rc.setValue([''], expire);
          rc.getValue(expire).push('blah');

          const theExpected = [''];
          theExpected.push('blah');

          expect(rc.getValue(monthDayYearOnly)).toEqual(theExpected);
        });
      });

      describe('and current date same as expire', () => {
        test('and date expired', () => {
          const renewalInMonths = 1;

          const expire = new Date(
            Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + renewalInMonths, today.getUTCDate())
          );

          const expected = [''];

          const rc = new ValueCache(expire, [], renewalInMonths);
          rc.setValue([''], expire);

          expect(rc.getValue(rc.expireDate)).toEqual(expected);
          expect(rc.expireDate.getTime()).toEqual(
            new Date(
              Date.UTC(rc.expireDate.getUTCFullYear(), rc.expireDate.getUTCMonth(), rc.expireDate.getUTCDate())
            ).getTime()
          );
        });
      });
    });
  });

  describe('and setValue', () => {
    describe('and expire date null', () => {
      describe('and current date null', () => {
        test('should return set value', () => {
          const rc = new ProtectValueCache(null, [], 1);
          const expected = [''];
          rc.setValue(expected);
          expect(rc.getRawValue()).toEqual(expected);
        });
      });

      describe('and current date populated', () => {
        test('should return set value', () => {
          const expire = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate());

          const rc = new ProtectValueCache(null, [], 1);
          const expected = [''];
          rc.setValue(expected, expire);
          expect(rc.getRawValue()).toEqual(expected);
        });
      });
    });

    describe('and expire date populated', () => {
      describe('and current date null', () => {
        test('should return set value', () => {
          const expectedDefault: string[] = [];
          const expectedValue = [''];
          const renewalInMonths = 1;

          const rc = new ProtectValueCache(monthDayYearOnly, expectedDefault, renewalInMonths);
          rc.setValue(expectedValue);

          expect(rc.getRawValue()).toEqual(expectedValue);
          expect(rc.expireDate.getUTCMonth()).toBe(monthDayYearOnly.getUTCMonth());
        });
      });

      describe('and current date newer', () => {
        test('should return set value', () => {
          const expectedDefault: string[] = [];
          const expectedValue = [''];
          const renewalInMonths = 1;

          const currentDate = new Date(
            Date.UTC(
              monthDayYearOnly.getUTCFullYear(),
              monthDayYearOnly.getUTCMonth() + renewalInMonths,
              monthDayYearOnly.getUTCDate()
            )
          );

          const rc = new ProtectValueCache(monthDayYearOnly, expectedDefault, renewalInMonths);
          rc.setValue(expectedValue, currentDate);

          expect(rc.getRawValue()).toEqual(expectedValue);
        });
      });

      describe('and current date populated', () => {
        test('should return set value', () => {
          const expire = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate()));

          const rc = new ProtectValueCache(null, [], 1);
          const expected = [''];
          rc.setValue(expected, expire);
          expect(rc.getRawValue()).toEqual(expected);
        });
      });
    });
  });

  describe('and isCachedExpired', () => {
    describe('no expireDate', () => {
      describe('no currentDate', () => {
        test('should be false', () => {
          const e = new ValueCache(null, null, 1);
          expect(e.isCacheExpired(null)).toBeFalsy();
        });
      });

      describe('and currentDate populated', () => {
        test('should be false', () => {
          const e = new ValueCache(null, null, 1);
          expect(e.isCacheExpired(monthDayYearOnly)).toBeFalsy();
        });
      });
    });

    describe('and expireDate is old', () => {
      describe('and currentDate newer', () => {
        test('should be true', () => {
          const renewalInMonths = 1;
          const expire = new Date(
            Date.UTC(
              monthDayYearOnly.getUTCFullYear(),
              monthDayYearOnly.getUTCMonth() + renewalInMonths,
              monthDayYearOnly.getUTCDate()
            )
          );

          const e = new ValueCache(monthDayYearOnly, null, renewalInMonths);
          expect(e.isCacheExpired(expire)).toBeTruthy();
        });
      });
    });

    describe('and expireDate is newer', () => {
      describe('and currentDate older', () => {
        test('should be true', () => {
          const expire = new Date(
            Date.UTC(
              monthDayYearOnly.getUTCFullYear(),
              monthDayYearOnly.getUTCMonth() - 1,
              monthDayYearOnly.getUTCDate()
            )
          );

          const e = new ValueCache(monthDayYearOnly, null, 1);
          expect(e.isCacheExpired(expire)).toBeFalsy();
        });
      });
    });
  });
});
