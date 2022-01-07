import { randomNumberBetween } from '../../src/utils/data-number';

describe('data-numbers unit tests', () => {
  describe('randomNumberBetween', () => {
    test('should be greater than or equal', () => {
      expect(randomNumberBetween(1, 3)).toBeGreaterThanOrEqual(1);
    });
    test('should should return first number', () => {
      const expected = 4;
      expect(randomNumberBetween(expected, expected)).toEqual(expected);
    });
    test('should be less than or equal', () => {
      expect(randomNumberBetween(1, 3)).toBeLessThanOrEqual(3);
    });
  });
});
