jest.mock('../../src/ledger/ledger-collection');

import { canInvestByUser } from '../../src/calculations/can-invest-by-user';
import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { IRentalInvestorValidator } from '../../src/investments/rental-investor-validator';
import { UserInvestResult } from '../../src/investments/user-invest-result';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { IUserInvestorCheck } from '../../src/account/i-user-investor-check';
import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { IRuleEvaluation } from '../../src/rules/rule-evaluation';
import { cloneDateUtc } from '../../src/utils/data-clone-date';
import { LedgerCollection } from '../../src/ledger/ledger-collection';

describe('and canInvestByUser', () => {
  let instance: RentalSingleFamily;
  let today: Date;
  let ledgerCollection: jest.Mocked<LedgerCollection>;

  beforeEach(() => {
    instance = new RentalSingleFamily();
    ledgerCollection = new LedgerCollection() as jest.Mocked<LedgerCollection>;
    ledgerCollection.getBalance.mockReturnValue(0);
    today = cloneDateUtc(new Date());
  });

  test('and isOwned true', () => {
    instance.purchaseDate = new Date();

    const expected: jest.Mocked<IRentalInvestorValidator> = {
      canInvest: false,
      results: [new UserInvestResult(InvestmentReasons.PropertyIsAlreadyOwned)],
    } as jest.Mocked<IRentalInvestorValidator>;

    const actual = canInvestByUser(instance, null, today, null);
    expect(actual).toMatchObject(expected);
  });

  describe('and isOwned false', () => {
    test('and hasMoneyToInvest false', () => {
      const user: IUserInvestorCheck = {
        getAvailableSavings: jest.fn(),
        ledgerCollection,
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        loanSettings: [],
        purchaseRules: [
          {
            type: PurchaseRuleTypes.MinAskingPrice,
            propertyType: instance.propertyType,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        holdRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(false),
        hasMinimumSavings: jest.fn().mockReturnValue(false),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [
          new UserInvestResult(InvestmentReasons.UserHasNoMoneyToInvest, 'user balance: 0'),
          new UserInvestResult(InvestmentReasons.UserHasNotSavedEnoughMoney, 'user balance: 0, minimumSavings: 1'),
        ],
      };

      expect(canInvestByUser(instance, user, today, null)).toMatchObject(expected);
    });
  });

  describe('and hasMoneyToInvest true', () => {
    test('and ledger.hasMinimumSavings is false', () => {
      const user: IUserInvestorCheck = {
        getAvailableSavings: jest.fn(),
        ledgerCollection,
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        loanSettings: [],
        purchaseRules: [
          {
            type: PurchaseRuleTypes.MinAskingPrice,
            propertyType: instance.propertyType,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        holdRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(false),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      instance.purchasePrice = 200000;

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [
          new UserInvestResult(InvestmentReasons.UserHasNotSavedEnoughMoney, 'user balance: 0, minimumSavings: 1'),
        ],
      };

      expect(canInvestByUser(instance, user, today, null)).toMatchObject(expected);
    });
  });

  describe('and ledger.hasMinimumSavings is true', () => {
    test('and no rules', () => {
      const user: IUserInvestorCheck = {
        getAvailableSavings: jest.fn(),
        ledgerCollection,
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        loanSettings: [],
        purchaseRules: [],
        holdRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(true),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [new UserInvestResult(InvestmentReasons.NoRules, 'user has no purchase rules')],
      };

      expect(canInvestByUser(instance, user, today, null)).toMatchObject(expected);
    });

    test('and no rules match', () => {
      const user: IUserInvestorCheck = {
        getAvailableSavings: jest.fn(),
        ledgerCollection,
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        loanSettings: [],
        purchaseRules: [
          {
            type: PurchaseRuleTypes.MinAskingPrice,
            propertyType: instance.propertyType,
            value: 20000,
            evaluate: jest.fn().mockReturnValue(false),
          },
          {
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            propertyType: instance.propertyType,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        holdRules: [],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(true),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      instance.purchasePrice = 400000;
      instance.cashDownPercent = 4;

      const expected: IRentalInvestorValidator = {
        canInvest: false,
        results: [
          new UserInvestResult(
            InvestmentReasons.DoesNotMeetUserRuleAskingPrice,
            `rule: 20000 property: ${instance.purchasePrice}`
          ),
          new UserInvestResult(
            InvestmentReasons.DoesNotMeetUserRuleOutOfPocket,
            `rule: 50000 property: ${instance.costDownPrice}`
          ),
        ],
      };

      const actual = canInvestByUser(instance, user, today, null);
      expect(actual).toMatchObject(expected);
    });

    test('and rules match', () => {
      const user: IUserInvestorCheck = {
        getAvailableSavings: jest.fn(),
        ledgerCollection,
        metMonthlyGoal: jest.fn(),
        monthlyIncomeAmountGoal: 0,
        loanSettings: [],
        purchaseRules: [
          {
            type: PurchaseRuleTypes.MinAfterRepairPrice,
            propertyType: instance.propertyType,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(true),
          },
          {
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            propertyType: instance.propertyType,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(true),
          },
          {
            type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
            propertyType: instance.propertyType,
            value: 50000,
            evaluate: jest.fn().mockReturnValue(true),
          },
        ],
        holdRules: [
          {
            type: HoldRuleTypes.MinSellInYears,
            propertyType: instance.propertyType,
            value: 1,
            evaluate: jest.fn().mockReturnValue(true),
          },
        ],
        hasMoneyToInvest: jest.fn().mockReturnValue(true),
        hasMinimumSavings: jest.fn().mockReturnValue(true),
        getMinimumSavings: jest.fn().mockReturnValue(1),
      };

      instance.cashDownPercent = 10;
      instance.purchasePrice = 20000;

      const expected: IRentalInvestorValidator = {
        canInvest: true,
        results: [],
      };

      const actual = canInvestByUser(instance, user, today, null);
      expect(actual).toMatchObject(expected);
    });

    describe('and PassiveApartment', () => {
      let instancePassive: RentalPassiveApartment;
      let user: jest.Mocked<IUserInvestorCheck>;
      let userPurchaseTypeRuleCapGains: jest.Mocked<IRuleEvaluation<PurchaseRuleTypes>>;

      afterEach(() => {
        instancePassive = null;
        user = null;
        userPurchaseTypeRuleCapGains = null;
      });

      beforeEach(() => {
        instancePassive = new RentalPassiveApartment();
        instancePassive.offeredInvestmentAmounts = [25000, 200000];
        instancePassive.purchasePrice = 2000000;

        userPurchaseTypeRuleCapGains = {
          type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
          propertyType: instancePassive.propertyType,
          value: 50000,
          evaluate: jest.fn(),
        } as jest.Mocked<IRuleEvaluation<PurchaseRuleTypes>>;

        user = {
          getAvailableSavings: jest.fn(),
          ledgerCollection,
          metMonthlyGoal: jest.fn(),
          monthlyIncomeAmountGoal: 0,
          getBalance: jest.fn().mockReturnValue(1000000),
          loanSettings: [],
          purchaseRules: [userPurchaseTypeRuleCapGains] as jest.Mocked<IRuleEvaluation<PurchaseRuleTypes>>[],
          holdRules: [
            {
              type: HoldRuleTypes.MinSellInYears,
              propertyType: instancePassive.propertyType,
              value: 1,
              evaluate: jest.fn().mockReturnValue(true),
            },
          ],
          hasMoneyToInvest: jest.fn().mockReturnValue(true),
          hasMinimumSavings: jest.fn().mockReturnValue(true),
          getMinimumSavings: jest.fn().mockReturnValue(1000000),
        } as jest.Mocked<IUserInvestorCheck>;
      });

      test('and rules match and true', () => {
        userPurchaseTypeRuleCapGains.evaluate.mockReturnValue(true);
        const expected: IRentalInvestorValidator = {
          canInvest: true,
          results: [],
        };

        const actual = canInvestByUser(instancePassive, user, today, null);
        expect(actual).toMatchObject(expected);
      });

      test('and rules match and all false', () => {
        userPurchaseTypeRuleCapGains.evaluate.mockReturnValue(false);

        const expected: IRentalInvestorValidator = {
          canInvest: false,
          results: [
            new UserInvestResult(InvestmentReasons.DoesNotMeetUserRuleEquityCapture, 'rule: 50000 property: 25687.5'),
            new UserInvestResult(InvestmentReasons.DoesNotMeetUserRuleEquityCapture, 'rule: 50000 property: 188000'),
          ],
        };

        const actual = canInvestByUser(instancePassive, user, today, null);
        expect(actual).toMatchObject(expected);
      });

      test('and rules match and first false', () => {
        userPurchaseTypeRuleCapGains.evaluate.mockReturnValueOnce(false);
        userPurchaseTypeRuleCapGains.evaluate.mockReturnValueOnce(true);

        const expected: IRentalInvestorValidator = {
          canInvest: true,
          results: [],
        };

        const actual = canInvestByUser(instancePassive, user, today, null);
        expect(actual).toMatchObject(expected);
      });
    });
  });
});
