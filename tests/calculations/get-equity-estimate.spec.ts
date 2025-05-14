import { getEquityEstimate } from '../../src/calculations/get-equity-estimate';

describe('getEquityEstimate unit tests', () => {
  test('should calc', () => {
    expect(getEquityEstimate(100, 10, 10)).toEqual(9);
  });

  test('and equity is 0, should be 0', () => {
    expect(getEquityEstimate(100, 10, 0)).toEqual(0);
  });

  test('and sell price is 0,should be 0', () => {
    expect(getEquityEstimate(0, 10, 10)).toEqual(0);
  });
});
