import { getCostDown } from '../../src/calculations/get-cost-down';
import currency from '../../src/formatters/currency';

describe('getCashDown unit tests', () => {
  describe('and success', () => {
    test('and values', () => {
      const expected = 25;
      const actual = getCostDown(100, expected);

      expect(actual).toEqual(expected);
    });

    test('and 0 percent', () => {
      const expected = 0;
      const actual = getCostDown(100, expected);

      expect(actual).toEqual(expected);
    });

    test('and 0 purchasePrice', () => {
      const actual = getCostDown(0, 10);

      expect(actual).toEqual(0);
    });
  });
});
