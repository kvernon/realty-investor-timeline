import { HoldRuleTypes } from '../src/rules/hold-rule-types';
import { ISimulateOptions, LoanSettings, PropertyType, PurchaseRuleTypes, simulate } from '../src';

describe('simulate integration tests', () => {
  describe('and success', () => {
    test('should run calc', () => {
      const options: ISimulateOptions = {
        amountInSavings: 100000,
        monthlyIncomeAmountGoal: 10000,
        monthlySavedAmount: 10000,
        holdRules: [
          { value: 2, type: HoldRuleTypes.MinSellIfHighEquityPercent, propertyType: PropertyType.SingleFamily },
        ],
        purchaseRules: [
          { value: 50000, type: PurchaseRuleTypes.MaxEstimatedOutOfPocket, propertyType: PropertyType.SingleFamily },
          {
            value: 5000,
            type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
            propertyType: PropertyType.SingleFamily,
          },
          {
            value: 200,
            type: PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
            propertyType: PropertyType.SingleFamily,
          },
        ],
        loanSettings: [
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
        ],
        maxYears: 1,
        generatorOptionsSingleFamily: {
          highestMinSellInYears: 1,
          lowestMinSellInYears: 1,
          highestPurchasePrice: 200000,
          lowestPurchasePrice: 150000,
          highestSellAppreciationPercent: 7,
          lowestSellAppreciationPercent: 5,
          lowestCashFlow: 300,
          highestCashFlow: 500,
          lowestEquityCapturePercent: 7,
          highestEquityCapturePercent: 15,
          maxRentalOpportunities: 4,
        },
        generatorOptionsPassiveApartment: {
          highestMinSellInYears: 8,
          lowestMinSellInYears: 5,
          highestPurchasePrice: 12000000,
          lowestPurchasePrice: 7000000,
          highestSellAppreciationPercent: 7,
          lowestSellAppreciationPercent: 5,
          lowestCashFlow: 1300,
          highestCashFlow: 1500,
          lowestEquityCapturePercent: 7,
          highestEquityCapturePercent: 15,
          maxRentalOpportunities: 6,
        },
      };

      const actual = simulate(options);
      let balance = 0;
      console.table(
        actual.user.ledgerCollection.filter().map((x) => {
          balance += x.amount;
          return { ...x, balance };
        })
      ); /*
      console.table(actual.rentals.filter(x => x.reasons.length > 0).map((x) => ({
        address: x.property.address,
        type: PropertyType[x.property.propertyType],
        reasons: JSON.stringify(x.reasons)
      })));*/
      expect(actual.getEstimatedMonthlyCashFlow()).toBeGreaterThan(0);
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
});
