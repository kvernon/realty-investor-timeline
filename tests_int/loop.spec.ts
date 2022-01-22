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
  generateRentalPassiveApartment,
  RentalPassiveApartment,
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
    test('should meet goal', () => {
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
        generateSingleFamily
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

      //console.log(JSON.stringify(actual, null, '  '));
      expect(
        actual.user.metMonthlyGoal(
          actual.endDate,
          actual.rentals.map((x) => x.property)
        )
      ).toBeTruthy();
      expect(
        actual.user.getEstimatedMonthlyCashFlow(
          actual.endDate,
          actual.rentals.map((x) => x.property)
        )
      ).toBeGreaterThan(0);
      expect(actual).not.toBeNull();
      expect(actual.user).not.toBeNull();
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });

  describe('and passive apartment', () => {
    test('should meet goal', () => {
      const totalSavings = new LedgerItem();
      totalSavings.amount = 200000;
      totalSavings.note = 'pulled my retirement savings';
      totalSavings.type = LedgerItemType.Saved;
      totalSavings.created = new Date();
      totalSavings.created.setDate(1);

      user.ledgerCollection.add(totalSavings);

      user.loanSettings = [
        {
          propertyType: PropertyType.PassiveApartment,
          name: LoanSettings.MinimumMonthlyReservesForRental,
          value: 6,
        },
        {
          name: LoanSettings.LoanRatePercent,
          value: 4,
          propertyType: PropertyType.PassiveApartment,
        },
        {
          name: LoanSettings.LoanTermInYears,
          value: 30,
          propertyType: PropertyType.PassiveApartment,
        },
      ];

      user.holdRules = [new RuleEvaluation(4, HoldRuleTypes.MinSellIfHighEquityPercent, PropertyType.PassiveApartment)];

      user.purchaseRules = [
        new RuleEvaluation(100000, PurchaseRuleTypes.MaxEstimatedOutOfPocket, PropertyType.PassiveApartment),
        new RuleEvaluation(7000, PurchaseRuleTypes.MinEstimatedCapitalGainsPercent, PropertyType.PassiveApartment),
        new RuleEvaluation(200, PurchaseRuleTypes.MinEstimatedAnnualCashFlow, PropertyType.PassiveApartment),
      ];

      const date = new Date();

      const propertyGeneratorPassiveApartment = new RentalGenerator<RentalPassiveApartment>(
        new ValueCache(cloneDateUtc(new Date()), [], 9),
        generateRentalPassiveApartment
      );

      propertyGeneratorPassiveApartment.maxRentalOpportunities = 7;
      propertyGeneratorPassiveApartment.highestMinSellInYears = 8;
      propertyGeneratorPassiveApartment.lowestMinSellInYears = 5;
      propertyGeneratorPassiveApartment.highestPurchasePrice = 12000000;
      propertyGeneratorPassiveApartment.lowestPurchasePrice = 7000000;
      propertyGeneratorPassiveApartment.highestSellAppreciationPercent = 7;
      propertyGeneratorPassiveApartment.lowestSellAppreciationPercent = 5;
      propertyGeneratorPassiveApartment.lowestCashFlow = 10000;
      propertyGeneratorPassiveApartment.highestCashFlow = 10002;
      propertyGeneratorPassiveApartment.lowestEquityCapturePercent = 7;
      propertyGeneratorPassiveApartment.highestEquityCapturePercent = 15;

      const options: ILoopOptions = {
        startDate: date,
        propertyGeneratorPassiveApartment,
        maxYears: 1,
      };

      const actual = movement(options, user);

      //console.log(JSON.stringify(actual, null, '  '));
      //console.log('balance', actual.user.ledgerCollection.getBalance(actual.endDate));
      expect(
        actual.user.metMonthlyGoal(
          actual.endDate,
          actual.rentals.map((x) => x.property)
        )
      ).toBeTruthy();
      expect(
        actual.user.getEstimatedMonthlyCashFlow(
          actual.endDate,
          actual.rentals.map((x) => x.property)
        )
      ).toBeGreaterThan(0);
      expect(actual).not.toBeNull();
      expect(actual.user).not.toBeNull();
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
});
