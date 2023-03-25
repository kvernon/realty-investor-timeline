import { Suite, Event } from 'benchmark';
import { generateRentalPassiveApartment } from '../src/generators/factory-passive-apartment';

describe('passive apartment generator performance tests', () => {
  let suite: Suite;
  beforeEach(() => {
    suite = new Suite();
    // add listeners
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
          generateRentalPassiveApartment(
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
            [],
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

    test('generate with randoms', (done) => {
      suite
        .add('generate with randoms', function () {
          generateRentalPassiveApartment(
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
            [],
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
