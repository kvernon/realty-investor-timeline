import { Chance } from 'chance';
import { cashOnCashReturn } from '../../src/calculations/cash-on-cash-return';
import currency from '../../src/formatters/currency';

describe('cashOnCashReturn unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
  });

  describe('and populated', () => {
    describe('with zeros', () => {
      test('should be zero', () => {
        expect(cashOnCashReturn(0, 0)).toEqual(0);
      });
    });

    describe('with true values', () => {
      test('should match', () => {
        const annualCashFlow = chance.integer({ min: 200, max: 599 }) * 12;
        const cashDown = chance.integer({ min: 20000, max: 50000 });

        const expected = currency((annualCashFlow / cashDown) * 100);
        expect(cashOnCashReturn(annualCashFlow, cashDown)).toEqual(expected);
      });
    });

    describe('with zero cashDown', () => {
      test('should be Infinity', () => {
        const annualCashFlow = chance.integer({ min: 200, max: 599 }) * 12;

        expect(cashOnCashReturn(annualCashFlow, 0)).toEqual(Infinity);
      });
    });
  });
});
