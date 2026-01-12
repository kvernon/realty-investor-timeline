import { getDateQuarter } from '../../src/utils/get-date-quarter';

describe('getDateQuarter', () => {
  test('and date q1', () => {
    expect(getDateQuarter(new Date(2026, 1, 1))).toEqual(0);
  });
  test('and date q2', () => {
    expect(getDateQuarter(new Date(2026, 4, 1))).toEqual(1);
  });
  test('and date q3', () => {
    expect(getDateQuarter(new Date(2026, 7, 1))).toEqual(2);
  });
  test('and date q4', () => {
    expect(getDateQuarter(new Date(2026, 10, 1))).toEqual(3);
  });
});
