import {
  generateSingleFamily,
  ILoopOptions,
  LedgerCollection,
  LedgerItem,
  LedgerItemType,
  LoanSettings,
  movement,
  PropertyType,
  PurchaseRuleTypes,
  RentalGenerator,
  RentalSingleFamily,
  RuleEvaluation,
  User,
  ValueCache,
  cloneDateUtc,
  HoldRuleTypes,
  IUser,
} from '../src';

describe('loop integration tests', () => {
  let user: IUser;

  beforeEach(() => {
    const totalSavings = new LedgerItem();
    totalSavings.amount = 100000;
    totalSavings.note = 'already saved';
    totalSavings.type = LedgerItemType.Saved;
    totalSavings.created = new Date();
    totalSavings.created.setDate(1);

    const ledgerCollection = new LedgerCollection();
    ledgerCollection.add(totalSavings);

    user = new User(ledgerCollection);
    user.monthlySavedAmount = 10000;
    user.monthlyIncomeAmountGoal = 10000;
  });

  describe('and single family', () => {
    test('should have cash flow', () => {
      user.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.MinimumMonthlyReservesForRental,
          value: 6,
        },
        {
          name: LoanSettings.LoanRatePercent,
          value: 4,
          propertyType: PropertyType.SingleFamily,
        },
        {
          name: LoanSettings.LoanTermInYears,
          value: 30,
          propertyType: PropertyType.SingleFamily,
        },
      ];

      user.holdRules = [new RuleEvaluation(4, HoldRuleTypes.MinSellIfHighEquityPercent, PropertyType.SingleFamily)];

      user.purchaseRules = [
        new RuleEvaluation(30000, PurchaseRuleTypes.MaxEstimatedOutOfPocket, PropertyType.SingleFamily),
        new RuleEvaluation(7000, PurchaseRuleTypes.MinEstimatedCapitalGainsPercent, PropertyType.SingleFamily),
        new RuleEvaluation(200, PurchaseRuleTypes.MinEstimatedAnnualCashFlow, PropertyType.SingleFamily),
      ];

      const date = new Date();

      const propertyGeneratorSingleFamily = new RentalGenerator<RentalSingleFamily>(
        new ValueCache(cloneDateUtc(new Date()), [], 4),
        generateSingleFamily,
      );

      propertyGeneratorSingleFamily.maxRentalOpportunities = 7;
      propertyGeneratorSingleFamily.highestMinSellInYears = 1;
      propertyGeneratorSingleFamily.lowestMinSellInYears = 1;
      propertyGeneratorSingleFamily.highestPurchasePrice = 120000;
      propertyGeneratorSingleFamily.lowestPurchasePrice = 100000;
      propertyGeneratorSingleFamily.highestSellAppreciationPercent = 7;
      propertyGeneratorSingleFamily.lowestSellAppreciationPercent = 5;
      propertyGeneratorSingleFamily.lowestCashFlow = 10000;
      propertyGeneratorSingleFamily.highestCashFlow = 10002;
      propertyGeneratorSingleFamily.lowestEquityCapturePercent = 7;
      propertyGeneratorSingleFamily.highestEquityCapturePercent = 15;

      const options: ILoopOptions = {
        startDate: date,
        propertyGeneratorSingleFamily,
        maxYears: 1,
      };

      const actual = movement(options, user);

      let balance = 0;
      console.table(
        actual.user.ledgerCollection.filter().map((x) => {
          balance += x.amount;
          return { ...x, balance };
        }),
      );

      console.log('endDate:', actual.endDate);
      console.log('endDate ledger:', actual.user.ledgerCollection.getLatestLedgerItem());

      console.table(
        actual.rentals
          .map((x) => ({
            address: x.property.address,
            type: PropertyType[x.property.propertyType],
            purchaseDate: x.property.purchaseDate,
            saleDate: x.property.soldDate,
            isOwned: x.property.isOwned,
            cashFlow: x.property.getEstimatedMonthlyCashFlow(cloneDateUtc(actual.endDate, (date) => date.setMonth(date.getMonth() + 1))),
          }))
          .filter((x) => x.isOwned),
      );

      expect(actual.getCashFlowMonthByEndDate()).toBeGreaterThan(0);

      console.table(actual.user.ledgerCollection.filter((x) => x.dateMatchesYearAndMonth(actual.endDate)));

      console.table(actual.user.ledgerCollection.getLastLedgerMonth());

      expect(actual).not.toBeNull();
      expect(actual.user).not.toBeNull();
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.endDate.toDateString()).toEqual(actual.user.ledgerCollection.getLatestLedgerItem().created?.toDateString());
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
});
