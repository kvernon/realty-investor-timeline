import { getCashDown } from '../../src/calculations/get-cash-down';

describe('getCashDown unit tests', () => {
  describe('and success', () => {
    test('and values', () => {
      const expected = 25;
      const actual = getCashDown(100, expected);

      expect(actual).toEqual(expected);
    });

    test('and 0 percent', () => {
      const expected = 0;
      const actual = getCashDown(100, expected);

      expect(actual).toEqual(expected);
    });

    test('and 0 purchasePrice', () => {
      const actual = getCashDown(0, 10);

      expect(actual).toEqual(0);
    });
  });
});
