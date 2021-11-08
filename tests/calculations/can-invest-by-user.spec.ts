import { canInvestByUser } from '../../src/calculations/can-invest-by-user';
import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { IRentalInvestorValidator } from '../../src/investments/rental-investor-validator';
import { UserInvestResult } from '../../src/investments/user-invest-result';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { IUserInvestorCheck } from '../../src/account/i-user-investor-check';

describe('and canInvestByUser', () => {
  let instance: RentalSingleFamily;

  beforeEach(() => {
    instance = new RentalSingleFamily();
  });

  test('and isOwned true', () => {
    instance.purchaseDate = new Date();

    const expected: jest.Mocked<IRentalInvestorValidator> = {
      canInvest: false,
      results: [new UserInvestResult(false, InvestmentReasons.PropertyIsAlreadyOwned)],
    } as jest.Mocked<IRentalInvestorValidator>;

    const actual = canInvestByUser(instance, null, null, null);
    expect(actual).toMatchObject(expected);
  });

  describe('and isOwned false', () => {
    test('and hasMoneyToInvest false', () => {
      const user: IUserInvestorCheck = {
        ledger: undefined,
        purchaseRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(false),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [new UserInvestResult(false, InvestmentReasons.UserHasNoMoneyToInvest)],
      };

      expect(canInvestByUser(instance, user, null, null)).toMatchObject(expected);
    });
  });

  describe('and hasMoneyToInvest true', () => {
    test('and ledger.hasMinimumSavings is false', () => {
      const user: IUserInvestorCheck = {
        ledger: {
          getBalance: jest.fn(),
          add: jest.fn(),
          getCashFlowMonth: jest.fn(),
          getMinimumSavings: jest.fn(),
          getSummariesAnnual: jest.fn(),
          getSummaryAnnual: jest.fn(),
          getSummaryMonth: jest.fn(),
          hasMinimumSavings: jest.fn().mockReturnValue(false),
        },
        purchaseRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [new UserInvestResult(false, InvestmentReasons.UserHasNotSavedEnoughMoney)],
      };

      expect(canInvestByUser(instance, user, null, null)).toMatchObject(expected);
    });
  });
  describe('and ledger.hasMinimumSavings is true', () => {
    test('and no rules', () => {
      const user: IUserInvestorCheck = {
        ledger: {
          getBalance: jest.fn(),
          add: jest.fn(),
          getCashFlowMonth: jest.fn(),
          getMinimumSavings: jest.fn(),
          getSummariesAnnual: jest.fn(),
          getSummaryAnnual: jest.fn(),
          getSummaryMonth: jest.fn(),
          hasMinimumSavings: jest.fn().mockReturnValue(true),
        },
        purchaseRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: true,
        results: [],
      };

      expect(canInvestByUser(instance, user, null, null)).toMatchObject(expected);
    });

    test('and no rules match', () => {
      const user: IUserInvestorCheck = {
        ledger: {
          getBalance: jest.fn(),
          add: jest.fn(),
          getCashFlowMonth: jest.fn(),
          getMinimumSavings: jest.fn(),
          getSummariesAnnual: jest.fn(),
          getSummaryAnnual: jest.fn(),
          getSummaryMonth: jest.fn(),
          hasMinimumSavings: jest.fn().mockReturnValue(true),
        },
        purchaseRules: [
          {
            type: PurchaseRuleTypes.minAskingPrice,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
          {
            type: PurchaseRuleTypes.maxEstimatedOutOfPocket,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
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
        ledger: {
          getBalance: jest.fn(),
          add: jest.fn(),
          getCashFlowMonth: jest.fn(),
          getMinimumSavings: jest.fn(),
          getSummariesAnnual: jest.fn(),
          getSummaryAnnual: jest.fn(),
          getSummaryMonth: jest.fn(),
          hasMinimumSavings: jest.fn().mockReturnValue(true),
        },
        purchaseRules: [
          {
            type: PurchaseRuleTypes.minAfterRepairPrice,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
          {
            type: PurchaseRuleTypes.maxEstimatedOutOfPocket,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
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
