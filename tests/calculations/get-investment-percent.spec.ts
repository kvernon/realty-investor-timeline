import { getInvestmentPercent } from '../../src/calculations/get-investment-percent';

describe('getInvestmentPercent unit tests', () => {
  describe('and success', () => {
    test('and values', () => {
      const expected = 25;
      const actual = getInvestmentPercent(25, 100);

      expect(actual).toEqual(expected);
    });

    test('and 0 percent', () => {
      const expected = 0;
      const actual = getInvestmentPercent(100, expected);

      expect(actual).toEqual(expected);
    });

    test('and 0 purchasePrice', () => {
      const actual = getInvestmentPercent(0, 10);

      expect(actual).toEqual(0);
    });
  });
});
