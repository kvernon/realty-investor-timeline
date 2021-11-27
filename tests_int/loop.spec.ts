import {
  generateSingleFamily,
  ILoopOptions,
  LedgerCollection,
  LedgerItem,
  LedgerItemType,
  LoanSettings,
  loop,
  PropertyType,
  PurchaseRuleTypes,
  RentalGenerator,
  RentalSingleFamily,
  RuleEvaluation,
  User,
  ValueCache,
  cloneDateUtc,
  HoldRuleTypes,
} from '../src';

describe('loop unit tests', () => {
  describe('and success', () => {
    test('should run calc', () => {
      const totalSavings = new LedgerItem();
      totalSavings.amount = 100000;
      totalSavings.note = 'already saved';
      totalSavings.type = LedgerItemType.Saved;
      totalSavings.created = new Date();
      totalSavings.created.setDate(1);

      const ledgerCollection = new LedgerCollection();
      ledgerCollection.add(totalSavings);

      const user = new User(ledgerCollection);
      user.monthlySavedAmount = 10000;
      user.monthlyIncomeAmountGoal = 10000;
      user.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.minimumReservesSingleFamily,
          value: 6,
        },
        {
          name: LoanSettings.loanRatePercent,
          value: 4,
          propertyType: PropertyType.SingleFamily,
        },
        {
          name: LoanSettings.loanTermInYears,
          value: 30,
          propertyType: PropertyType.SingleFamily,
        },
      ];

      user.holdRules = [new RuleEvaluation(4, HoldRuleTypes.minSellIfHighEquityPercent, PropertyType.SingleFamily)];

      user.purchaseRules = [
        new RuleEvaluation(30000, PurchaseRuleTypes.maxEstimatedOutOfPocket, PropertyType.SingleFamily),
        new RuleEvaluation(7000, PurchaseRuleTypes.minEstimatedCapitalGains, PropertyType.SingleFamily),
        new RuleEvaluation(200, PurchaseRuleTypes.minEstimatedCashFlowPerMonth, PropertyType.SingleFamily),
      ];

      const date = new Date();
      const valueCache = new ValueCache(cloneDateUtc(new Date()), [], 4);
      const propertyGeneratorSingleFamily = new RentalGenerator<RentalSingleFamily>(valueCache, generateSingleFamily);
      propertyGeneratorSingleFamily.maxRentalOpportunities = 4;
      propertyGeneratorSingleFamily.highestMinSellInYears = 1;
      propertyGeneratorSingleFamily.lowestMinSellInYears = 1;
      propertyGeneratorSingleFamily.highestPriceDown = 200000;
      propertyGeneratorSingleFamily.lowestPriceDown = 150000;
      propertyGeneratorSingleFamily.highestSellAppreciationPercent = 7;
      propertyGeneratorSingleFamily.lowestSellAppreciationPercent = 5;
      propertyGeneratorSingleFamily.lowestCashFlowMonthly = 200;
      propertyGeneratorSingleFamily.highestCashFlowMonthly = 500;
      propertyGeneratorSingleFamily.lowestEquityCapturePercent = 7;
      propertyGeneratorSingleFamily.highestEquityCapturePercent = 15;

      const options: ILoopOptions = {
        startDate: date,
        propertyGeneratorSingleFamily,
        maxYears: 1,
      };

      const actual = loop(options, user);

      //console.log(JSON.stringify(actual, null, '  '));
      expect(actual.user.metMonthlyGoal(actual.endDate)).toBeFalsy();
      expect(actual.user.getCashFlowMonth(actual.endDate)).toBeGreaterThan(0);
      expect(actual).not.toBeNull();
      expect(actual.user).not.toBeNull();
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
});
