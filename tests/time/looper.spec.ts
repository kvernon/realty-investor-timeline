import { Chance } from 'chance';
import { PropertyType } from '../../src/properties/property-type';
import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { ITimeline } from '../../src/time/timeline';
import { IRentalGenerator } from '../../src/generators/rental-generator';
import { IUser } from '../../src/account/user';
import { LedgerItemType } from '../../src/ledger/ledger-item-type';
import { LoanSettings } from '../../src/loans/loan-settings';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { RuleEvaluation } from '../../src/rules/rule-evaluation';
import { InvestmentReasons } from '../../src/investments/investment-reasons';

jest.mock('../../src/properties/rental-single-family');
jest.mock('../../src/properties/rental-passive-apartment');

describe('looper unit tests', () => {
  let chance: Chance.Chance;
  let rentalGeneratorHome: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  let rentalGeneratorPassive: jest.Mocked<IRentalGenerator<RentalPassiveApartment>>;
  let user: jest.Mocked<IUser>;
  let ensureArray: jest.Mock;
  let updateHistoricalRentals: jest.Mock;
  let getMinCostDownByRule: jest.Mock;
  let expectedToday: Date;
  let cloneDateUtc: jest.Mock;

  beforeEach(() => {
    chance = new Chance();
    expectedToday = new Date(Date.UTC(2021, 1, 1));

    ensureArray = jest.fn();
    updateHistoricalRentals = jest.fn();
    cloneDateUtc = jest.fn().mockReturnValue(expectedToday);
    getMinCostDownByRule = jest.fn();

    jest.doMock('../../src/utils/ensure', () => ({
      ensureArray,
    }));

    jest.doMock('../../src/time/update-historical-rentals', () => ({
      updateHistoricalRentals,
    }));

    jest.doMock('../../src/utils/data-clone-date', () => ({
      cloneDateUtc,
    }));

    jest.doMock('../../src/properties/property-sort', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue(1),
    }));

    jest.doMock('../../src/calculations/get-min-cost-down-by-rule', () => ({
      getMinCostDownByRule,
    }));

    user = {
      ledgerCollection: {
        add: jest.fn(),
        getMonthlyCashFlowByYear: jest.fn(),
        getCashFlowYearAverage: jest.fn(),
        getBalance: jest.fn(),
        getMinimumSavings: jest.fn(),
        clone: jest.fn().mockReturnThis(),
        filter: jest.fn(),
        getLatestLedgerItem: jest.fn(),
        getAvailableSavings: jest.fn(),
        getCashFlowMonth: jest.fn(),
        getSummariesAnnual: jest.fn(),
        getSummaryAnnual: jest.fn(),
        getSummaryMonth: jest.fn(),
        hasMinimumSavings: jest.fn(),
        getLastLedgerMonth: jest.fn(),
      },
      getCashFlowMonth: jest.fn(),
      getAvailableSavings: jest.fn(),
      getEstimatedMonthlyCashFlow: jest.fn(),
      metMonthlyGoal: jest.fn(),
      monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
      purchaseRules: [new RuleEvaluation(4, PurchaseRuleTypes.MinEstimatedAnnualCashFlow, PropertyType.SingleFamily)],
      holdRules: [new RuleEvaluation(0, HoldRuleTypes.MinSellIfHighEquityPercent, PropertyType.SingleFamily)],
      loanSettings: [{ value: 3, propertyType: PropertyType.SingleFamily, name: LoanSettings.LoanTermInYears }],
      hasMoneyToInvest: jest.fn(),
      hasMinimumSavings: jest.fn().mockReturnValue(true),
      getMinimumSavings: jest.fn().mockReturnValue(0),
      monthlySavedAmount: chance.integer({ min: 1, max: 10 }),
      clone: jest.fn().mockReturnThis(),
    } as jest.Mocked<IUser>;

    rentalGeneratorPassive = {
      getRentals: jest.fn(),
      removeRentalById: jest.fn(),
    } as jest.Mocked<IRentalGenerator<RentalPassiveApartment>>;

    rentalGeneratorHome = {
      getRentals: jest.fn(),
      removeRentalById: jest.fn(),
    } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  });

  afterEach(() => {
    chance = null;
    expectedToday = null;
    user = null;
    rentalGeneratorHome = null;
    rentalGeneratorPassive = null;
    updateHistoricalRentals = null;
    ensureArray = null;
    cloneDateUtc = null;
    jest.resetModules();
    jest.restoreAllMocks();
  });

  describe('and monthlySavedAmount', () => {
    let actual: ITimeline;

    beforeEach(() => {
      updateHistoricalRentals.mockReturnValue([]);
      const movement = require('../../src/time/looper').looper;
      actual = movement(
        {
          propertyGeneratorSingleFamily: rentalGeneratorHome,
          propertyGeneratorPassiveApartment: rentalGeneratorPassive,
          hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
        },
        {
          user,
          endDate: new Date(),
          getBalance: jest.fn(),
          startDate: new Date(),
          rentals: [],
          clone: jest.fn().mockReturnThis(),
          getEstimatedMonthlyCashFlow: jest.fn(),
        }
      );
    });

    test('user.ledgerCollection.add should have been called', () => {
      expect(user.ledgerCollection.add).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          amount: user.monthlySavedAmount,
          type: LedgerItemType.Salary,
          created: expectedToday,
          note: 'saved for month',
        })
      );
    });
  });

  describe('and hasMoneyToInvest is false', () => {
    beforeEach(() => {
      user.hasMoneyToInvest.mockReturnValue(false);
      updateHistoricalRentals.mockReturnValue([]);
      const looper = require('../../src/time/looper').looper;
      looper(
        {
          propertyGeneratorSingleFamily: rentalGeneratorHome,
          propertyGeneratorPassiveApartment: rentalGeneratorPassive,
          hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
        },
        {
          user,
          endDate: new Date(),
          getBalance: jest.fn(),
          startDate: new Date(),
          rentals: [],
          clone: jest.fn().mockReturnThis(),
          getEstimatedMonthlyCashFlow: jest.fn(),
        }
      );
    });

    test('user.ledgerCollection.add should have been called', () => {
      expect(user.ledgerCollection.add).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          amount: user.monthlySavedAmount,
          type: LedgerItemType.Salary,
          created: expectedToday,
          note: 'saved for month',
        })
      );
    });
  });

  describe('and zero properties', () => {
    let actual: ITimeline;

    beforeEach(() => {
      user.hasMoneyToInvest.mockReturnValue(true);
      updateHistoricalRentals.mockReturnValue([]);
      const looper = require('../../src/time/looper').looper;
      actual = looper(
        {
          propertyGeneratorSingleFamily: rentalGeneratorHome,
          propertyGeneratorPassiveApartment: rentalGeneratorPassive,
          hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
        },
        {
          user,
          endDate: expectedToday,
          getBalance: jest.fn(),
          startDate: expectedToday,
          rentals: [],
          clone: jest.fn().mockReturnThis(),
          getEstimatedMonthlyCashFlow: jest.fn(),
        }
      );
    });

    test('UpdateHistoricalRentals should have been called', () => {
      expect(updateHistoricalRentals).toHaveBeenCalled();
      expect(updateHistoricalRentals.mock.calls[0][0].name).toEqual(RentalSingleFamily.name);
      expect(updateHistoricalRentals.mock.calls[1][0].name).toEqual(RentalPassiveApartment.name);

      expect(updateHistoricalRentals).toHaveBeenNthCalledWith(
        1,
        expect.any(Function),
        rentalGeneratorHome,
        [],
        expectedToday,
        user.loanSettings
      );

      expect(updateHistoricalRentals).toHaveBeenNthCalledWith(
        2,
        expect.any(Function),
        rentalGeneratorPassive,
        [],
        expectedToday,
        user.loanSettings
      );
    });

    test('should return', () => {
      expect(actual).toEqual(
        expect.objectContaining({
          startDate: expectedToday,
          endDate: expectedToday,
          rentals: [],
          user,
        })
      );
    });
  });

  describe('and properties', () => {
    let actual: ITimeline;
    let rentalSF: jest.Mocked<RentalSingleFamily>;
    let rentalPA: jest.Mocked<RentalPassiveApartment>;

    afterEach(() => {
      actual = null;
      rentalPA = null;
      rentalSF = null;
    });

    beforeEach(() => {
      user.hasMoneyToInvest.mockReturnValue(true);
      rentalSF = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
      rentalSF.address = 'sf addy';
      rentalSF.id = 'sf-id';
      Object.defineProperty(rentalSF, 'propertyType', {
        value: PropertyType.SingleFamily,
      });

      rentalPA = new RentalPassiveApartment() as jest.Mocked<RentalPassiveApartment>;
      rentalPA.address = 'pa addy';
      rentalPA.id = 'pa-id';
      Object.defineProperty(rentalPA, 'propertyType', {
        value: PropertyType.PassiveApartment,
      });

      updateHistoricalRentals.mockReturnValue([rentalSF, rentalPA].map((x) => ({ property: x, reasons: [] })));
    });

    describe('and cash flow', () => {
      beforeEach(() => {
        Object.defineProperty(rentalSF, 'isOwned', {
          get: jest.fn().mockReturnValue(true),
        });
        //rentalSF.isOwned = true;
        rentalSF.getCashFlowByDate.mockReturnValue(7);

        Object.defineProperty(rentalPA, 'isOwned', {
          get: jest.fn().mockReturnValue(true),
        });
        //rentalPA.isOwned = true;
        rentalPA.getCashFlowByDate.mockReturnValue(10);

        user.monthlySavedAmount = 0;

        const looper = require('../../src/time/looper').looper;
        actual = looper(
          {
            propertyGeneratorSingleFamily: rentalGeneratorHome,
            propertyGeneratorPassiveApartment: rentalGeneratorPassive,
            hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
          },
          {
            user,
            endDate: new Date(),
            getBalance: jest.fn(),
            startDate: new Date(),
            rentals: [],
            clone: jest.fn().mockReturnThis(),
            getEstimatedMonthlyCashFlow: jest.fn(),
          }
        );
      });

      test('should add to ledger', () => {
        expect(actual.user.ledgerCollection.add).toHaveBeenCalledTimes(2);

        expect(actual.user.ledgerCollection.add).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            amount: rentalSF.getCashFlowByDate(null),
            type: LedgerItemType.CashFlow,
            created: expectedToday,
            note: `for: ${rentalSF.address}, id: ${rentalSF.id} (${PropertyType[rentalSF.propertyType]})`,
          })
        );

        expect(actual.user.ledgerCollection.add).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            amount: rentalPA.getCashFlowByDate(null),
            type: LedgerItemType.CashFlow,
            created: expectedToday,
            note: `for: ${rentalPA.address}, id: ${rentalPA.id} (${PropertyType[rentalPA.propertyType]})`,
          })
        );
      });
    });

    describe('and sell properties', () => {
      beforeEach(() => {
        user.hasMoneyToInvest.mockReturnValue(true);
        Object.defineProperty(rentalSF, 'isOwned', {
          get: jest.fn().mockReturnValue(true),
        });
        rentalSF.getCashFlowByDate.mockReturnValue(0);
        rentalSF.canSell.mockReturnValue(true);
        rentalSF.getEquityFromSell.mockReturnValue(20);

        Object.defineProperty(rentalPA, 'isOwned', {
          get: jest.fn().mockReturnValue(true),
        });
        rentalPA.getCashFlowByDate.mockReturnValue(0);
        rentalPA.canSell.mockReturnValue(true);
        rentalPA.getEquityFromSell.mockReturnValue(2);

        user.monthlySavedAmount = 0;

        const looper = require('../../src/time/looper').looper;
        actual = looper(
          {
            propertyGeneratorSingleFamily: rentalGeneratorHome,
            propertyGeneratorPassiveApartment: rentalGeneratorPassive,
            hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
          },
          {
            user,
            endDate: new Date(),
            getBalance: jest.fn(),
            startDate: new Date(),
            rentals: [],
            clone: jest.fn().mockReturnThis(),
            getEstimatedMonthlyCashFlow: jest.fn(),
          }
        );
      });

      test('should add to ledger', () => {
        expect(actual.user.ledgerCollection.add).toHaveBeenCalledTimes(2);

        expect(actual.user.ledgerCollection.add).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            amount: rentalSF.getEquityFromSell(null),
            type: LedgerItemType.Equity,
            created: expectedToday,
            note: `for: ${rentalSF.address}, id: ${rentalSF.id} (${PropertyType[rentalSF.propertyType]})`,
          })
        );

        expect(actual.user.ledgerCollection.add).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            amount: rentalPA.getEquityFromSell(null),
            type: LedgerItemType.Equity,
            created: expectedToday,
            note: `for: ${rentalPA.address}, id: ${rentalPA.id} (${PropertyType[rentalPA.propertyType]})`,
          })
        );
      });
    });

    describe('and buy properties', () => {
      beforeEach(() => {
        user.hasMoneyToInvest.mockReturnValue(true);
        Object.defineProperty(rentalSF, 'isOwned', {
          get: jest.fn().mockReturnValue(true),
        });
        rentalSF.getCashFlowByDate.mockReturnValue(0);
        rentalSF.isAvailableByDate.mockReturnValue(true);
        rentalSF.getEquityFromSell.mockReturnValue(20);

        Object.defineProperty(rentalPA, 'isOwned', {
          get: jest.fn().mockReturnValue(true),
        });
        rentalPA.getCashFlowByDate.mockReturnValue(0);
        rentalPA.isAvailableByDate.mockReturnValue(true);
        rentalPA.getEquityFromSell.mockReturnValue(2);

        getMinCostDownByRule.mockReturnValueOnce(8);
        getMinCostDownByRule.mockReturnValueOnce(80);

        user.monthlySavedAmount = 0;
      });

      describe('and can do investment', () => {
        beforeEach(() => {
          rentalSF.canInvestByUser.mockReturnValue({ canInvest: true, results: [] });
          rentalPA.canInvestByUser.mockReturnValue({ canInvest: true, results: [] });

          const looper = require('../../src/time/looper').looper;
          actual = looper(
            {
              propertyGeneratorSingleFamily: rentalGeneratorHome,
              propertyGeneratorPassiveApartment: rentalGeneratorPassive,
              hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
            },
            {
              user,
              endDate: new Date(),
              getBalance: jest.fn(),
              startDate: new Date(),
              rentals: [],
              clone: jest.fn().mockReturnThis(),
              getEstimatedMonthlyCashFlow: jest.fn(),
            }
          );
        });

        test('should add to ledger', () => {
          expect(actual.user.ledgerCollection.add).toHaveBeenCalledTimes(2);

          expect(actual.user.ledgerCollection.add).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
              amount: -8,
              type: LedgerItemType.Purchase,
              created: expectedToday,
              note: `for: ${rentalSF.address}, id: ${rentalSF.id} (${PropertyType[rentalSF.propertyType]})`,
            })
          );

          expect(actual.user.ledgerCollection.add).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
              amount: -80,
              type: LedgerItemType.Purchase,
              created: expectedToday,
              note: `for: ${rentalPA.address}, id: ${rentalPA.id} (${PropertyType[rentalPA.propertyType]})`,
            })
          );
        });
      });
      describe('and can NOT do investment', () => {
        beforeEach(() => {
          rentalSF.canInvestByUser.mockReturnValue({
            canInvest: false,
            results: [{ message: chance.string(), investmentReason: InvestmentReasons.NoRules }],
          });
          rentalPA.canInvestByUser.mockReturnValue({
            canInvest: false,
            results: [
              {
                message: chance.string(),
                investmentReason: InvestmentReasons.UserHasNoMoneyToInvest,
              },
              {
                message: chance.string(),
                investmentReason: InvestmentReasons.DoesNotMeetUserRuleOutOfPocket,
              },
            ],
          });

          const looper = require('../../src/time/looper').looper;
          actual = looper(
            {
              propertyGeneratorSingleFamily: rentalGeneratorHome,
              propertyGeneratorPassiveApartment: rentalGeneratorPassive,
              hasMetGoalOrMaxTime: jest.fn().mockReturnValue(true),
            },
            {
              user,
              endDate: new Date(),
              getBalance: jest.fn(),
              startDate: new Date(),
              rentals: [],
              clone: jest.fn().mockReturnThis(),
              getEstimatedMonthlyCashFlow: jest.fn(),
            }
          );
        });

        test('should NOT add to ledger', () => {
          expect(actual.user.ledgerCollection.add).not.toHaveBeenCalled();
        });

        test('should append reasons to passive', () => {
          const historicalPropertySF = actual.rentals.find(
            (x) => x.property.propertyType === PropertyType.SingleFamily
          );
          const historicalPropertyPA = actual.rentals.find(
            (x) => x.property.propertyType === PropertyType.PassiveApartment
          );

          expect(historicalPropertySF.reasons.length).toEqual(1);
          expect(historicalPropertyPA.reasons.length).toEqual(2);
        });
      });
    });
  });
});
