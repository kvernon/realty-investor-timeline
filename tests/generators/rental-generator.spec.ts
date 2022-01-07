jest.mock('../../src/caching/value-cache');
jest.mock('../../src/utils/data-number');
jest.mock('../../src/properties/rental-single-family');

import { RentalGenerator } from '../../src/generators/rental-generator';
import { ValueCache } from '../../src/caching/value-cache';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import * as DataNumbers from '../../src/utils/data-number';
import { GenerateProperty } from '../../src/generators/generate-property';

describe('Rental Generator tests', () => {
  let randomNumberBetween: jest.SpyInstance<number, [start: number, end: number]>;
  let generic: jest.MockedFunction<GenerateProperty<RentalSingleFamily>>;

  beforeEach(() => {
    randomNumberBetween = jest.spyOn(DataNumbers, 'randomNumberBetween');
    generic = jest.fn();
  });

  afterEach(() => {
    randomNumberBetween = null;
    generic = null;
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  describe('and getRentals', () => {
    describe('and no rentals', () => {
      test('empty returned', () => {
        const valueCache = new ValueCache(null, null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;
        const expectedValue: RentalSingleFamily[] = [];
        valueCache.getValue.mockReturnValue(expectedValue);
        const gen = new RentalGenerator(valueCache, generic);
        expect(gen.getRentals(RentalSingleFamily, new Date(), [])).toEqual(expectedValue);
      });
    });

    describe('and rental info supplied', () => {
      test('populated returned', () => {
        const maxRentalOpportunities = 5;

        randomNumberBetween.mockReturnValueOnce(maxRentalOpportunities);

        generic.mockReturnValueOnce(new RentalSingleFamily());
        generic.mockReturnValueOnce(new RentalSingleFamily());
        generic.mockReturnValueOnce(new RentalSingleFamily());
        generic.mockReturnValueOnce(new RentalSingleFamily());
        generic.mockReturnValueOnce(new RentalSingleFamily());

        const expected = [
          new RentalSingleFamily(),
          new RentalSingleFamily(),
          new RentalSingleFamily(),
          new RentalSingleFamily(),
          new RentalSingleFamily(),
        ];

        const valueCache = new ValueCache(null, null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;
        const emptyExpected: RentalSingleFamily[] = [];
        valueCache.getValue.mockReturnValue(emptyExpected);
        const gen = new RentalGenerator(valueCache, generic);
        gen.maxRentalOpportunities = maxRentalOpportunities;

        const actual = gen.getRentals(RentalSingleFamily, new Date(), []);
        expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
      });

      test('and in cache', () => {
        const maxRentalOpportunities = 2;

        const expected = [new RentalSingleFamily(), new RentalSingleFamily()];

        const valueCache = new ValueCache(null, null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;
        valueCache.getValue.mockReturnValue(expected);

        const gen = new RentalGenerator(valueCache, generic);
        gen.maxRentalOpportunities = maxRentalOpportunities;

        const actual = gen.getRentals(RentalSingleFamily, new Date(), []);
        expect(actual).toEqual(expected);
      });

      describe('and rental ranges supplied', () => {
        test('and threshold within range', () => {
          const maxRentalOpportunities = 2;

          generic.mockReturnValueOnce(new RentalSingleFamily());

          // totalRandom
          randomNumberBetween.mockReturnValueOnce(1);

          // purchasePrice
          randomNumberBetween.mockReturnValueOnce(16);

          // minSaleYears
          randomNumberBetween.mockReturnValueOnce(6);

          // SellPercent
          const randomSellPercent = 351;
          randomNumberBetween.mockReturnValueOnce(randomSellPercent);

          // refinancePercent
          randomNumberBetween.mockReturnValueOnce(10);

          // minRefinanceMonths
          randomNumberBetween.mockReturnValueOnce(24);

          const valueCache = new ValueCache(null, null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;

          const expected = [new RentalSingleFamily()];
          valueCache.getValue.mockReturnValue(expected);

          const gen = new RentalGenerator(valueCache, generic);
          gen.maxRentalOpportunities = maxRentalOpportunities;

          gen.lowestPricePrice = 200;
          gen.highestPricePrice = 300;

          gen.lowestMinSellInYears = 5;
          gen.highestMinSellInYears = 8;

          const actual = gen.getRentals(RentalSingleFamily, new Date(), []);
          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
