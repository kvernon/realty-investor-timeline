import { cloneDateUtc, ISimulateOptions, LoanSettings, PropertyType, PurchaseRuleTypes, simulate, HoldRuleTypes } from '../src';

describe('simulate integration tests', () => {
  describe('and success', () => {
    test('should run calc', () => {
      const options: ISimulateOptions = {
        amountInSavings: 100000,
        monthlyIncomeAmountGoal: 10000,
        monthlySavedAmount: 10000,
        holdRules: [{ value: 2, type: HoldRuleTypes.MinSellIfHighEquityPercent, propertyType: PropertyType.SingleFamily }],
        purchaseRules: [
          {
            value: 50000,
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            propertyType: PropertyType.SingleFamily,
          },
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
        maxYears: 7,
        generatorOptionsSingleFamily: {
          lowestMinSellInYears: 1,
          highestMinSellInYears: 1,
          lowestPurchasePrice: 150000,
          highestPurchasePrice: 250000,
          lowestSellAppreciationPercent: 5,
          highestSellAppreciationPercent: 7,
          lowestCashFlow: 200,
          highestCashFlow: 550,
          lowestEquityCapturePercent: 7,
          highestEquityCapturePercent: 15,
          maxRentalOpportunities: 4,
          maxMonthsToCache: 2,
        },
      };
      const actual = simulate(options);
      let balance = 0;
      console.table(
        actual.user.ledgerCollection.getLastLedgerMonth().map((x) => {
          balance += x.amount;
          return { ...x, balance };
        }),
      );

      console.table(
        actual.rentals
          .filter((x) => x.reasons.length > 0)
          .map((x) => ({
            address: x.property.address,
            type: PropertyType[x.property.propertyType],
            reasons: JSON.stringify(x.reasons),
          })),
      );

      console.table(actual.user.ledgerCollection.filter((x) => x.dateMatchesYearAndMonth(actual.endDate)));

      console.table(actual.user.ledgerCollection.getLastLedgerMonth());

      const cashFlowMonthByEndDate = actual.getCashFlowMonthByEndDate();

      console.log('typeof cashFlowMonthByEndDate', typeof cashFlowMonthByEndDate, cashFlowMonthByEndDate);

      expect(cashFlowMonthByEndDate).toBeGreaterThan(0);
      expect(actual.endDate).toEqual(cloneDateUtc(actual.user.ledgerCollection.getLatestLedgerItem().created));
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
  describe('and success with defaults', () => {
    test('should run calc', () => {
      const actual = simulate();
      let balance = 0;
      console.table(
        actual.user.ledgerCollection.filter().map((x) => {
          balance += x.amount;
          return { ...x, balance };
        }),
      );
      console.table(
        actual.rentals
          .filter((x) => x.reasons.length > 0)
          .map((x) => ({
            address: x.property.address,
            type: PropertyType[x.property.propertyType],
            reasons: JSON.stringify(x.reasons),
          })),
      );

      console.log('endDate:', actual.endDate);
      console.log('endDate ledger:', actual.user.ledgerCollection.getLatestLedgerItem());

      console.table(
        actual.rentals
          .filter((x) => x.reasons.length === 0)
          .map((x) => ({
            address: x.property.address,
            type: PropertyType[x.property.propertyType],
            purchaseDate: x.property.purchaseDate,
            saleDate: x.property.soldDate,
            isOwned: x.property.isOwned,
            cashFlow: x.property.getEstimatedMonthlyCashFlow(actual.endDate),
          }))
          .filter((x) => x.isOwned),
      );

      expect(actual.getCashFlowMonthByEndDate()).toBeGreaterThan(0);

      console.table(actual.user.ledgerCollection.filter((x) => x.dateMatchesYearAndMonth(actual.endDate)));

      console.table(actual.user.ledgerCollection.getLastLedgerMonth());
      console.log('getCashFlowMonthByEndDate cash flow', actual.getCashFlowMonthByEndDate());
      console.log('last month cash flow', actual.user.ledgerCollection.getCashFlowMonth(actual.endDate));
      console.log('last quarter cash flow', actual.user.ledgerCollection.getAverageCashFlowMonthByQuarter(actual.endDate));

      expect(actual.endDate).toEqual(cloneDateUtc(actual.user.ledgerCollection.getLatestLedgerItem().created));
      expect(actual.startDate).not.toBeNull();
      expect(actual.endDate).not.toBeNull();
      expect(actual.rentals).not.toBeNull();
      expect(actual.rentals).not.toEqual([]);
    });
  });
});
