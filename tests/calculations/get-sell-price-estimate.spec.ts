import { getSellPriceEstimate } from '../../src/calculations/get-sell-price-estimate';

describe('getSellPriceEstimate unit tests', () => {
  describe('and same month', () => {
    test('should return purchase price unchanged', () => {
      const date = new Date(Date.UTC(2020, 0, 1));
      expect(getSellPriceEstimate(date, date, 100000, 10)).toBe(100000);
    });
  });

  describe('and zero appreciation', () => {
    test('should return purchase price regardless of years', () => {
      const purchase = new Date(Date.UTC(2020, 0, 1));
      const sell = new Date(Date.UTC(2025, 0, 1));
      expect(getSellPriceEstimate(purchase, sell, 100000, 0)).toBe(100000);
    });
  });

  describe('and 1 year hold', () => {
    test('should apply one year of appreciation', () => {
      const purchase = new Date(Date.UTC(2020, 0, 1));
      const sell = new Date(Date.UTC(2021, 0, 1));
      expect(getSellPriceEstimate(purchase, sell, 100000, 10)).toBe(110000);
    });
  });

  describe('and 2 year hold', () => {
    test('should compound appreciation over 2 years', () => {
      const purchase = new Date(Date.UTC(2020, 0, 1));
      const sell = new Date(Date.UTC(2022, 0, 1));
      expect(getSellPriceEstimate(purchase, sell, 100000, 10)).toBe(121000);
    });
  });

  describe('and partial year', () => {
    test('should ceil to next full year', () => {
      const purchase = new Date(Date.UTC(2020, 0, 1));
      const sell = new Date(Date.UTC(2020, 6, 1));
      expect(getSellPriceEstimate(purchase, sell, 100000, 10)).toBe(110000);
    });
  });

  describe('and 13 months', () => {
    test('should ceil to 2 years', () => {
      const purchase = new Date(Date.UTC(2020, 0, 1));
      const sell = new Date(Date.UTC(2021, 1, 1));
      expect(getSellPriceEstimate(purchase, sell, 100000, 10)).toBe(121000);
    });
  });

  describe('and 30 year hold', () => {
    test('should compound appreciation over 30 years', () => {
      const purchase = new Date(Date.UTC(2020, 0, 1));
      const sell = new Date(Date.UTC(2050, 0, 1));
      const result = getSellPriceEstimate(purchase, sell, 200000, 15);
      expect(result).toBeGreaterThan(13000000);
      expect(result).toBeLessThan(13300000);
    });
  });
});
