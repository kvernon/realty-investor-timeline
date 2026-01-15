import { getDateQuarter } from '../../src/utils/get-date-quarter';

describe('getDateQuarter', () => {
  describe('and date q1', () => {
    test('should return 0', () => {
      expect(getDateQuarter(new Date(2026, 1, 1))).toEqual(0);
    });
  });
  describe('and date q2', () => {
    test('should return 1', () => {
      expect(getDateQuarter(new Date(2026, 4, 1))).toEqual(1);
    });
  });
  describe('and date q3', () => {
    test('should return 2', () => {
      expect(getDateQuarter(new Date(2026, 7, 1))).toEqual(2);
    });
  });
  describe('and date q4', () => {
    test('should return 3', () => {
      expect(getDateQuarter(new Date(2026, 10, 1))).toEqual(3);
    });
  });
});
