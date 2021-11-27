import { getMonthlyPrincipalInterestTaxInterest } from '../../src/calculations/get-monthly-principal-interest-tax-interest';

describe('getMonthlyPrincipalInterestTaxInterest unit tests', () => {
  describe('and success', () => {
    test('and values', () => {
      const monthlyMortgage = getMonthlyPrincipalInterestTaxInterest(205000, 25, 6, 4.24);

      expect(monthlyMortgage).toBeGreaterThanOrEqual(1220);
      expect(monthlyMortgage).toBeLessThanOrEqual(1225);
    });
  });
});
