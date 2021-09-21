import { create } from '../../src/generators/rental-generator';
import { RentalSingleFamily } from '../../src/single-family/rental-single-family';
import { Chance } from 'chance';

describe('create unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
  });

  describe('and options empty', () => {
    test('should serialize', () => {
      const expected = new RentalSingleFamily();
      expect(create({}, RentalSingleFamily)).toEqual(expected);
    });
  });
  describe('and options fully populated', () => {
    test('should serialize', () => {
      const expected = new RentalSingleFamily();
      expected.address = chance.address();
      expected.id = chance.word();
      expected.minSellYears = chance.integer({ min: 1, max: 90 });
      expected.availableStartDate = chance.date();
      expected.availableEndDate = chance.date();
      expected.purchasePrice = chance.integer({ min: 100000, max: 9000000 });

      expect(create(expected, RentalSingleFamily)).toEqual(expected);
    });
  });
  describe('and options partially populated', () => {
    test('should serialize', () => {
      const expected = new RentalSingleFamily();
      expected.address = chance.address();
      expected.id = chance.word();
      expected.availableStartDate = chance.date();
      expected.purchasePrice = chance.integer({ min: 100000, max: 9000000 });

      expect(create(expected, RentalSingleFamily)).toEqual(expected);
    });
  });
});
