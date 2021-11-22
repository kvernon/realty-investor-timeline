import { ISimulateOptions, LoanSettings, PropertyType, PurchaseRuleTypes, simulate } from '../src';

describe('simulate unit tests', () => {
  describe('and success', () => {
    test('should run calc', () => {
      const options: ISimulateOptions = {
        amountInSavings: 100000,
        monthlyIncomeAmountGoal: 10000,
        monthlySavedAmount: 10000,
        purchaseRules: [
          { value: 30000, type: PurchaseRuleTypes.maxEstimatedOutOfPocket },
          { value: 7000, type: PurchaseRuleTypes.minEstimatedCapitalGains },
          { value: 200, type: PurchaseRuleTypes.minEstimatedCashFlowPerMonth },
        ],
        loanSettings: [
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
        ],
        maxYears: 1,
        maxRentalOpportunitiesSingleFamily: 4,
        highestMinSellInYears: 1,
        lowestMinSellInYears: 1,
        highestPriceDown: 200000,
        lowestPriceDown: 150000,
        highestSellAppreciationPercent: 7,
        lowestSellAppreciationPercent: 5,
        lowestCashFlowMonthly: 200,
        highestCashFlowMonthly: 500,
        lowestEquityCapturePercent: 7,
        highestEquityCapturePercent: 15,
      };

      const actual = simulate(options);
      expect(actual).not.toBeNull();
      expect(actual.user).not.toBeNull();
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
});
