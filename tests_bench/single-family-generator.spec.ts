import { Event, Suite } from 'benchmark';
import { generateSingleFamily } from '../src/generators/factory-single-family';
import { LoanSettings } from '../src/loans/loan-settings';
import { PropertyType } from '../src/properties/property-type';

describe('single family generator performance tests', () => {
  let suite: Suite;
  beforeEach(() => {
    suite = new Suite();
  });

  afterEach(() => {
    suite.off();
    suite = null;
  });

  describe('should run performance', () => {
    test('generate with non-randoms', (done) => {
      // add tests
      suite
        .add('generate with non-randoms', function () {
          generateSingleFamily(
            {
              lowestCashFlow: 200,
              highestCashFlow: 200,
              lowestEquityCapturePercent: 10,
              highestEquityCapturePercent: 10,
              lowestMinSellInYears: 1,
              highestMinSellInYears: 2,
              lowestPurchasePrice: 100000,
              highestPurchasePrice: 100000,
              lowestSellAppreciationPercent: 10,
              highestSellAppreciationPercent: 10,
            },
            {
              availableEndDate: new Date(),
              availableStartDate: new Date(),
            },
            [{ name: LoanSettings.LoanTermInYears, value: 30, propertyType: PropertyType.SingleFamily }],
            10
          );
        })
        .on('cycle', function (event: Event) {
          console.log(String(event.target));
          expect(event.target.hz).toBeGreaterThanOrEqual(32500);
          done();
        })
        .run();
    }, 7000);

    test('generate with randoms', (done) => {
      suite
        .add('generate with randoms', function () {
          generateSingleFamily(
            {
              lowestCashFlow: 200,
              highestCashFlow: 500,
              lowestEquityCapturePercent: 10,
              highestEquityCapturePercent: 20,
              lowestMinSellInYears: 1,
              highestMinSellInYears: 3,
              lowestPurchasePrice: 100000,
              highestPurchasePrice: 200000,
              lowestSellAppreciationPercent: 10,
              highestSellAppreciationPercent: 20,
            },
            {
              availableEndDate: new Date(),
              availableStartDate: new Date(),
            },
            [{ name: LoanSettings.LoanTermInYears, value: 30, propertyType: PropertyType.SingleFamily }],
            10
          );
        })
        .on('cycle', function (event: Event) {
          console.log(String(event.target));
          expect(event.target.hz).toBeGreaterThanOrEqual(25000);
          done();
        })
        .run();
    }, 7000);
  });
});
