jest.mock('../../src/caching/value-cache');
jest.mock('../../src/utils/data-number');
jest.mock('../../src/single-family/rental-single-family');

import { RentalGenerator } from '../../src/generators/rental-generator';
import { ValueCache } from '../../src/caching/value-cache';
import { RentalSingleFamily } from '../../src/single-family/rental-single-family';
import * as DataNumbers from '../../src/utils/data-number';
import * as DataProperty from '../../src/utils/data-property-entity';

describe('Rental Generator tests', () => {
  let randomNumberBetween: jest.SpyInstance<number, [start: number, end: number]>;
  let randomPropertyEntity: jest.SpyInstance;

  beforeEach(() => {
    randomNumberBetween = jest.spyOn(DataNumbers, 'randomNumberBetween');
    randomPropertyEntity = jest.spyOn(DataProperty, 'randomPropertyEntity');
  });

  afterEach(() => {
    randomNumberBetween = null;
    randomPropertyEntity = null;
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  describe('and getRentals', () => {
    describe('and no rentals', () => {
      test('empty returned', () => {
        const valueCache = new ValueCache(null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;
        const expectedValue: RentalSingleFamily[] = [];
        valueCache.getValue.mockReturnValue(expectedValue);
        const gen = new RentalGenerator(valueCache);
        expect(gen.getRentals(RentalSingleFamily)).toEqual(expectedValue);
      });
    });

    describe('and rental info supplied', () => {
      test('populated returned', () => {
        const maxRentalOpportunities = 5;

        randomNumberBetween.mockReturnValueOnce(maxRentalOpportunities);

        randomPropertyEntity.mockReturnValueOnce({});
        randomPropertyEntity.mockReturnValueOnce({});
        randomPropertyEntity.mockReturnValueOnce({});
        randomPropertyEntity.mockReturnValueOnce({});
        randomPropertyEntity.mockReturnValueOnce({});

        const expected = [
          new RentalSingleFamily(),
          new RentalSingleFamily(),
          new RentalSingleFamily(),
          new RentalSingleFamily(),
          new RentalSingleFamily(),
        ];

        const valueCache = new ValueCache(null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;
        const emptyExpected: RentalSingleFamily[] = [];
        valueCache.getValue.mockReturnValue(emptyExpected);
        const gen = new RentalGenerator(valueCache);
        gen.maxRentalOpportunities = maxRentalOpportunities;

        const actual = gen.getRentals(RentalSingleFamily);
        expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
      });

      test('and in cache', () => {
        const maxRentalOpportunities = 2;

        const expected = [new RentalSingleFamily(), new RentalSingleFamily()];

        const valueCache = new ValueCache(null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;
        valueCache.getValue.mockReturnValue(expected);

        const gen = new RentalGenerator(valueCache);
        gen.maxRentalOpportunities = maxRentalOpportunities;

        const actual = gen.getRentals(RentalSingleFamily);
        expect(actual).toEqual(expected);
      });

      describe('and rental ranges supplied', () => {
        test('and threshold within range', () => {
          const maxRentalOpportunities = 2;

          randomPropertyEntity.mockReturnValueOnce({});

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

          const valueCache = new ValueCache(null, null) as jest.Mocked<ValueCache<RentalSingleFamily>>;

          const expected = [new RentalSingleFamily()];
          valueCache.getValue.mockReturnValue(expected);

          const gen = new RentalGenerator(valueCache);
          gen.maxRentalOpportunities = maxRentalOpportunities;

          gen.lowestPriceDown = 200;
          gen.highestPriceDown = 300;

          gen.lowestMinSellInYears = 5;
          gen.highestMinSellInYears = 8;

          const actual = gen.getRentals(RentalSingleFamily);
          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
