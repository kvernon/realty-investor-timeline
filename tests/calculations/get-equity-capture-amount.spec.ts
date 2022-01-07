import { getEquityCaptureAmount } from '../../src/calculations/get-equity-capture-amount';

describe('getEquityCaptureAmount unit tests', () => {
  describe('and success', () => {
    test('and values', () => {
      const investmentPercent = 100;
      const purchasePrice = 25;
      const salePrice = 200;
      const expected = salePrice - purchasePrice;

      const actual = getEquityCaptureAmount(investmentPercent, purchasePrice, salePrice);

      expect(actual).toEqual(expected);
    });

    test('and 0 percent', () => {
      const expected = 0;
      const actual = getEquityCaptureAmount(100, expected, 200);

      expect(actual).toEqual(expected);
    });

    test('and 0 purchasePrice', () => {
      const actual = getEquityCaptureAmount(0, 10, 200);

      expect(actual).toEqual(0);
    });
  });
});
