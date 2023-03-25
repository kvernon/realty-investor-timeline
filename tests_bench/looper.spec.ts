import { Event, Suite } from 'benchmark';
import { generateSingleFamily } from '../src/generators/factory-single-family';
import { looper } from '../src/time/looper';
import { RentalGenerator } from '../src/generators/rental-generator';
import { RentalSingleFamily } from '../src/properties/rental-single-family';
import { cloneDateUtc } from '../src/utils/data-clone-date';
import { Timeline } from '../src/time/timeline';
import { User } from '../src/account/user';
import { LedgerCollection } from '../src/ledger/ledger-collection';
import { ValueCache } from '../src/caching/value-cache';
import { RuleEvaluation } from '../src/rules/rule-evaluation';
import { PurchaseRuleTypes } from '../src/rules/purchase-rule-types';
import { PropertyType } from '../src/properties/property-type';
import { LoanSettings } from '../src';

describe('loop performance tests', () => {
  let suite: Suite;
  let rentalGeneratorHome: RentalGenerator<RentalSingleFamily>;

  beforeEach(() => {
    suite = new Suite();

    rentalGeneratorHome = new RentalGenerator<RentalSingleFamily>(
      new ValueCache(new Date(), [], 2),
      generateSingleFamily
    );
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
  });

  afterEach(() => {
    suite.off();
    suite = null;
  });

  describe('should run performance', () => {
    test('should be performant for looper run', (done) => {
      // add tests
      suite
        .add('should be performant for looper run', function () {
          const user = new User(new LedgerCollection());
          user.monthlySavedAmount = 3000;
          user.monthlyIncomeAmountGoal = 4000;
          user.holdRules = [];
          user.purchaseRules = [
            new RuleEvaluation<PurchaseRuleTypes>(
              55000,
              PurchaseRuleTypes.MaxEstimatedOutOfPocket,
              PropertyType.SingleFamily
            ),
          ];
          user.loanSettings = [
            {
              propertyType: PropertyType.SingleFamily,
              name: LoanSettings.LoanRatePercent,
              value: 4,
            },
            {
              propertyType: PropertyType.SingleFamily,
              name: LoanSettings.MinimumMonthlyReservesForRental,
              value: 6,
            },
            {
              propertyType: PropertyType.SingleFamily,
              name: LoanSettings.LoanTermInYears,
              value: 30,
            },
          ];

          looper(
            {
              propertyGeneratorSingleFamily: rentalGeneratorHome,
            },
            new Timeline(cloneDateUtc(new Date()), cloneDateUtc(new Date()), [], user)
          );
        })
        .on('cycle', function (event: Event) {
          console.log(String(event.target));
          expect(event.target.hz).toBeGreaterThanOrEqual(13000);
          done();
        })
        .run();
    }, 7000);
  });
});
