jest.mock('../../src/properties/rental-single-family');
jest.mock('../../src/properties/rental-passive-apartment');

import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { Chance } from 'chance';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { IRentalGenerator } from '../../src/generators/rental-generator';
import { IUser } from '../../src/account/user';
import { RuleEvaluation } from '../../src/rules/rule-evaluation';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { PropertyType } from '../../src/properties/property-type';
import { LoanSettings } from '../../src/loans/loan-settings';

describe('movement options unit tests', () => {
  let chance: Chance.Chance;
  let rentalGeneratorHome: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  let rentalGeneratorPassive: jest.Mocked<IRentalGenerator<RentalPassiveApartment>>;
  let user: jest.Mocked<IUser>;

  beforeEach(() => {
    chance = new Chance();

    user = {
      ledgerCollection: null,
      getAvailableSavings: jest.fn(),
      getCashFlowMonth: jest.fn(),
      getEstimatedMonthlyCashFlow: jest.fn(),
      metMonthlyGoal: jest.fn(),
      monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
      purchaseRules: [],
      holdRules: [],
      loanSettings: [],
      getBalance: jest.fn(),
      hasMoneyToInvest: jest.fn().mockReturnValue(true),
      hasMinimumSavings: jest.fn().mockReturnValue(true),
      getMinimumSavings: jest.fn().mockReturnValue(0),
      addLedgerItem: jest.fn(),
      monthlySavedAmount: chance.integer({ min: 1, max: 10 }),
      clone: jest.fn(),
    } as jest.Mocked<IUser>;

    user.clone.mockReturnValueOnce(user);
  });

  afterEach(() => {
    chance = null;
    user = null;
    rentalGeneratorHome = null;
    rentalGeneratorPassive = null;
  });

  describe('and movement', () => {
    describe('and invalid options', () => {
      describe('and no generators', () => {
        test('should fail', () => {
          const movement = require('../../src/time/movement').movement;

          expect(() => movement({}, user)).toThrow(
            'Invalid Argument: must declare at least 1, either propertyGeneratorSingleFamily or propertyGeneratorPassiveApartment'
          );
        });
      });

      describe('and SingleFamily generators', () => {
        beforeEach(() => {
          rentalGeneratorHome = {
            getRentals: jest.fn(),
            removeRentalById: jest.fn(),
          } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
        });

        describe('and no ILoanSetting', () => {
          test('should fail', () => {
            const movement = require('../../src/time/movement').movement;

            expect(() =>
              movement(
                {
                  propertyGeneratorSingleFamily: rentalGeneratorHome,
                },
                user
              )
            ).toThrow('no single family loan settings for user: loanSettings');
          });
        });

        describe('and no PurchaseRuleTypes', () => {
          test('should fail', () => {
            user.loanSettings = [
              {
                value: 3,
                propertyType: PropertyType.SingleFamily,
                name: LoanSettings.LoanTermInYears,
              },
            ];
            const movement = require('../../src/time/movement').movement;

            expect(() =>
              movement(
                {
                  propertyGeneratorSingleFamily: rentalGeneratorHome,
                },
                user
              )
            ).toThrow('no single family or passive apartment purchase rules for user: purchaseRules');
          });
        });

        describe('and falsy HoldRuleTypes', () => {
          beforeEach(() => {
            user.loanSettings = [
              {
                value: 3,
                propertyType: PropertyType.SingleFamily,
                name: LoanSettings.LoanTermInYears,
              },
            ];

            user.purchaseRules = [
              new RuleEvaluation(4, PurchaseRuleTypes.MinEstimatedAnnualCashFlow, PropertyType.SingleFamily),
            ];
          });

          describe('and no rules', () => {
            test('should fail', () => {
              const movement = require('../../src/time/movement').movement;

              expect(() =>
                movement(
                  {
                    propertyGeneratorSingleFamily: rentalGeneratorHome,
                  },
                  user
                )
              ).toThrow('no single family hold rules for user: holdRules');
            });
          });

          describe('and no single family rules', () => {
            test('should fail', () => {
              user.holdRules = [
                new RuleEvaluation(4, HoldRuleTypes.MinSellIfHighEquityPercent, PropertyType.PassiveApartment),
              ];

              const movement = require('../../src/time/movement').movement;

              expect(() =>
                movement(
                  {
                    propertyGeneratorSingleFamily: rentalGeneratorHome,
                  },
                  user
                )
              ).toThrow('no single family hold rules for user: holdRules');
            });
          });
        });
      });

      describe('and RentalPassiveApartment generators', () => {
        beforeEach(() => {
          rentalGeneratorPassive = {
            getRentals: jest.fn(),
            removeRentalById: jest.fn(),
          } as jest.Mocked<IRentalGenerator<RentalPassiveApartment>>;
        });

        describe('and no PurchaseRuleTypes', () => {
          test('should fail', () => {
            user.loanSettings = [
              {
                value: 3,
                propertyType: PropertyType.PassiveApartment,
                name: LoanSettings.LoanTermInYears,
              },
            ];

            const movement = require('../../src/time/movement').movement;

            expect(() =>
              movement(
                {
                  propertyGeneratorPassiveApartment: rentalGeneratorPassive,
                },
                user
              )
            ).toThrow('no single family or passive apartment purchase rules for user: purchaseRules');
          });
        });
      });
    });
  });
});
