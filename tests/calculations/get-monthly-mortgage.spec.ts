import { getMonthlyMortgage } from '../../src/calculations/get-monthly-mortgage';

describe('getMonthlyMortgage unit tests', () => {
  describe('and success', () => {
    test('and values', () => {
      const monthlyMortgage = getMonthlyMortgage(205000, 25, 6, 4.24);

      expect(monthlyMortgage).toBeGreaterThanOrEqual(755);
      expect(monthlyMortgage).toBeLessThanOrEqual(760);
    });
  });
});
