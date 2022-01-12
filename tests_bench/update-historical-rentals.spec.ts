import { Event, Suite } from 'benchmark';
import { ValueCache } from '../src/caching/value-cache';
import { generateSingleFamily } from '../src/generators/factory-single-family';
import { RentalGenerator } from '../src/generators/rental-generator';
import { LoanSettings } from '../src/loans/loan-settings';
import { PropertyType } from '../src/properties/property-type';
import { RentalSingleFamily } from '../src/properties/rental-single-family';
import { updateHistoricalRentals } from '../src/time/update-historical-rentals';

describe('update historical rentals performance tests', () => {
  let suite: Suite;
  let rentalGeneratorHome: RentalGenerator<RentalSingleFamily>;

  beforeEach(() => {
    suite = new Suite();
    rentalGeneratorHome = new RentalGenerator<RentalSingleFamily>(
      new ValueCache(new Date(), [], 2),
      generateSingleFamily
    );
  });

  afterEach(() => {
    suite.off();
    suite = null;
    rentalGeneratorHome = null;
  });

  describe('should run performance', () => {
    test('generate with non-randoms', (done) => {
      rentalGeneratorHome.lowestCashFlow = 200;
      rentalGeneratorHome.highestCashFlow = 200;
      rentalGeneratorHome.lowestEquityCapturePercent = 10;
      rentalGeneratorHome.highestEquityCapturePercent = 10;
      rentalGeneratorHome.lowestMinSellInYears = 1;
      rentalGeneratorHome.highestMinSellInYears = 2;
      rentalGeneratorHome.lowestPurchasePrice = 100000;
      rentalGeneratorHome.highestPurchasePrice = 100000;
      rentalGeneratorHome.lowestSellAppreciationPercent = 10;
      rentalGeneratorHome.highestSellAppreciationPercent = 10;

      // add tests
      suite
        .add('generate with non-randoms', function () {
          updateHistoricalRentals<RentalSingleFamily>(RentalSingleFamily, rentalGeneratorHome, [], new Date(), [
            { name: LoanSettings.LoanTermInYears, value: 30, propertyType: PropertyType.SingleFamily },
          ]);
        })
        .on('cycle', function (event: Event) {
          console.log(String(event.target));
          expect(event.target.hz).toBeGreaterThanOrEqual(600000);
          done();
        })
        .run();
    }, 7000);

    test('generate with randoms', (done) => {
      rentalGeneratorHome.lowestCashFlow = 200;
      rentalGeneratorHome.highestCashFlow = 500;
      rentalGeneratorHome.lowestEquityCapturePercent = 10;
      rentalGeneratorHome.highestEquityCapturePercent = 20;
      rentalGeneratorHome.lowestMinSellInYears = 1;
      rentalGeneratorHome.highestMinSellInYears = 3;
      rentalGeneratorHome.lowestPurchasePrice = 100000;
      rentalGeneratorHome.highestPurchasePrice = 200000;
      rentalGeneratorHome.lowestSellAppreciationPercent = 10;
      rentalGeneratorHome.highestSellAppreciationPercent = 20;

      suite
        .add('generate with randoms', function () {
          updateHistoricalRentals<RentalSingleFamily>(RentalSingleFamily, rentalGeneratorHome, [], new Date(), [
            { name: LoanSettings.LoanTermInYears, value: 30, propertyType: PropertyType.SingleFamily },
          ]);
        })
        .on('cycle', function (event: Event) {
          console.log(String(event.target));
          expect(event.target.hz).toBeGreaterThanOrEqual(650000);
          done();
        })
        .run();
    }, 7000);
  });
});
