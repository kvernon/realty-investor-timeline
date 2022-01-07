import { Chance } from 'chance';
import { returnOnCapitalGain } from '../../src/calculations/return-on-capital-gain';
import currency from '../../src/formatters/currency';

describe('returnOnCapitalGain unit tests', () => {
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
        expect(returnOnCapitalGain(0, 0)).toEqual(0);
      });
    });

    describe('with true values', () => {
      test('should match', () => {
        const unrealizedCapitalGain = chance.integer({ min: 10000, max: 30000 });
        const cashDown = chance.integer({ min: 31000, max: 50000 });

        const expected = currency((unrealizedCapitalGain / cashDown) * 100);
        expect(returnOnCapitalGain(unrealizedCapitalGain, cashDown)).toEqual(expected);
      });
    });

    describe('with zero cashDown', () => {
      test('should be Infinity', () => {
        const unrealizedCapitalGain = chance.integer({ min: 10000, max: 30000 });

        expect(returnOnCapitalGain(unrealizedCapitalGain, 0)).toEqual(Infinity);
      });
    });
  });
});
