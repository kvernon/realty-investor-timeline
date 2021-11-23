import { canInvestByUser } from '../../src/calculations/can-invest-by-user';
import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { IRentalInvestorValidator } from '../../src/investments/rental-investor-validator';
import { UserInvestResult } from '../../src/investments/user-invest-result';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { IUserInvestorCheck } from '../../src/account/i-user-investor-check';
import { PropertyType } from '../../src/account/property-type';

describe('and canInvestByUser', () => {
  let instance: RentalSingleFamily;

  beforeEach(() => {
    instance = new RentalSingleFamily();
  });

  test('and isOwned true', () => {
    instance.purchaseDate = new Date();

    const expected: jest.Mocked<IRentalInvestorValidator> = {
      canInvest: false,
      results: [new UserInvestResult(InvestmentReasons.PropertyIsAlreadyOwned)],
    } as jest.Mocked<IRentalInvestorValidator>;

    const actual = canInvestByUser(instance, null, null, null);
    expect(actual).toMatchObject(expected);
  });

  describe('and isOwned false', () => {
    test('and hasMoneyToInvest false', () => {
      const user: IUserInvestorCheck = {
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        getBalance: jest.fn().mockReturnValueOnce(0),
        loanSettings: [],
        purchaseRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(false),
        hasMinimumSavings: jest.fn().mockReturnValue(false),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [new UserInvestResult(InvestmentReasons.UserHasNoMoneyToInvest, 'user balance: 0')],
      };

      expect(canInvestByUser(instance, user, null, null)).toMatchObject(expected);
    });
  });

  describe('and hasMoneyToInvest true', () => {
    test('and ledger.hasMinimumSavings is false', () => {
      const user: IUserInvestorCheck = {
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        getBalance: jest.fn().mockReturnValue(0),
        loanSettings: [],
        purchaseRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(false),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [new UserInvestResult(InvestmentReasons.UserHasNotSavedEnoughMoney, 'user balance: 0')],
      };

      expect(canInvestByUser(instance, user, null, null)).toMatchObject(expected);
    });
  });
  describe('and ledger.hasMinimumSavings is true', () => {
    test('and no rules', () => {
      const user: IUserInvestorCheck = {
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        getBalance: jest.fn(),
        loanSettings: [],
        purchaseRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(true),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: true,
        results: [],
      };

      expect(canInvestByUser(instance, user, null, null)).toMatchObject(expected);
    });

    test('and no rules match', () => {
      const user: IUserInvestorCheck = {
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        getBalance: jest.fn(),
        loanSettings: [],
        purchaseRules: [
          {
            type: PurchaseRuleTypes.minAskingPrice,
            propertyType: PropertyType.SingleFamily,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
          {
            type: PurchaseRuleTypes.maxEstimatedOutOfPocket,
            propertyType: PropertyType.SingleFamily,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(true),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: true,
        results: [],
      };

      const actual = canInvestByUser(instance, user, null, null);
      expect(actual).toMatchObject(expected);
    });

    test('and rules match', () => {
      const user: IUserInvestorCheck = {
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        getBalance: jest.fn(),
        loanSettings: [],
        purchaseRules: [
          {
            type: PurchaseRuleTypes.minAfterRepairPrice,
            propertyType: PropertyType.SingleFamily,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
          {
            type: PurchaseRuleTypes.maxEstimatedOutOfPocket,
            propertyType: PropertyType.SingleFamily,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(true),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: true,
        results: [],
      };

      const actual = canInvestByUser(instance, user, null, null);
      expect(actual).toMatchObject(expected);
    });
  });
});
