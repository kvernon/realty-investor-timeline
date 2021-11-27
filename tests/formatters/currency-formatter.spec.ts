import currency from '../../src/formatters/currency';
import { Chance } from 'chance';

describe('currencyFormatter unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  describe('and 0', () => {
    test('should return 0', () => {
      expect(currency(0)).toEqual(0);
    });
  });

  describe('and null', () => {
    test('should return 0', () => {
      expect(currency(null)).toEqual(0);
    });
  });

  describe('and decimal', () => {
    test('should return decimal to the one hundredth', () => {
      const int = chance.integer({ min: 1000000, max: 9000000 });
      const decimal = chance.integer({ min: 10, max: 99 });
      const expected = parseFloat(`${int}.${decimal}`);

      const value = parseFloat(`${int}.${decimal}${decimal}${decimal}${decimal}`);
      expect(currency(value)).toEqual(expected);
    });
  });
});
