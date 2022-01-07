import { IPropertyEntityOptions } from '../../src/generators/i-property-entity-options';
import { RandomPropertyEntity } from '../../src/utils/data-property-entity';

describe('data-numbers unit tests', () => {
  let randomPropertyEntity: RandomPropertyEntity;
  let randomNumberBetween: jest.Mock;
  const hash = '000-000-000-000';
  const address = '111 fake street';

  beforeEach(() => {
    randomNumberBetween = jest.fn();
    randomNumberBetween.mockReturnValueOnce(10);
    randomNumberBetween.mockReturnValueOnce(20);
    randomNumberBetween.mockReturnValueOnce(30);
    randomNumberBetween.mockReturnValueOnce(40);
    randomNumberBetween.mockReturnValueOnce(50);

    jest.doMock('chance', () => {
      return {
        Chance: jest.fn().mockImplementation(() => ({
          hash: jest.fn().mockReturnValue(hash),
          address: jest.fn().mockReturnValue(address),
        })),
      };
    });

    jest.doMock('../../src/utils/data-number', () => ({
      randomNumberBetween,
    }));

    randomPropertyEntity = require('../../src/utils/data-property-entity').randomPropertyEntity;
  });

  afterEach(() => {
    randomPropertyEntity = null;
    randomNumberBetween = null;
  });

  describe('randomPropertyEntity', () => {
    test('should resolve', () => {
      const options: IPropertyEntityOptions = {
        highestCashFlow: 0,
        lowestCashFlow: 2,
        highestMinSellInYears: 1,
        highestPricePrice: 2,
        lowestPricePrice: 3,
        lowestMinSellInYears: 4,
        lowestSellAppreciationPercent: 5,
        highestSellAppreciationPercent: 6,
        lowestEquityCapturePercent: 7,
        highestEquityCapturePercent: 8,
      };

      expect(randomPropertyEntity(options)).toEqual({
        address,
        id: hash,
        minSellYears: 30,
        purchasePrice: 10,
        rawCashFlow: 20,
        sellPriceAppreciationPercent: 40,
        equityCapturePercent: 50,
      });

      expect(randomNumberBetween).toHaveBeenNthCalledWith(1, options.lowestPricePrice, options.highestPricePrice);
      expect(randomNumberBetween).toHaveBeenNthCalledWith(2, options.lowestCashFlow, options.highestCashFlow);
      expect(randomNumberBetween).toHaveBeenNthCalledWith(
        3,
        options.lowestMinSellInYears,
        options.highestMinSellInYears
      );
      expect(randomNumberBetween).toHaveBeenNthCalledWith(
        4,
        options.lowestSellAppreciationPercent,
        options.highestSellAppreciationPercent
      );
      expect(randomNumberBetween).toHaveBeenNthCalledWith(
        5,
        options.lowestEquityCapturePercent,
        options.highestEquityCapturePercent
      );
    });
  });
});
