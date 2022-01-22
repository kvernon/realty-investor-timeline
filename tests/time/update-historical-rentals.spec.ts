jest.mock('../../src/properties/rental-single-family');
jest.mock('../../src/properties/rental-passive-apartment');

import { Chance } from 'chance';
import { IRentalGenerator } from '../../src/generators/rental-generator';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { PropertyType } from '../../src/properties/property-type';
import { LoanSettings } from '../../src/loans/loan-settings';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { RuleEvaluation } from '../../src/rules/rule-evaluation';
import { IHistoricalProperty } from '../../src/time/i-historical-property';
import { IUser } from '../../src/account/user';

describe('updateHistoricalRentals unit tests', () => {
  let chance: Chance.Chance;
  let user: jest.Mocked<IUser>;
  let rentalGeneratorHome: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;

  beforeEach(() => {
    chance = new Chance();

    user = {
      getAvailableSavings: jest.fn(),
      ledgerCollection: null,
      getCashFlowMonth: jest.fn(),
      metMonthlyGoal: jest.fn(),
      getEstimatedMonthlyCashFlow: jest.fn(),
      monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
      purchaseRules: [new RuleEvaluation(4, PurchaseRuleTypes.MinEstimatedAnnualCashFlow, PropertyType.SingleFamily)],
      holdRules: [new RuleEvaluation(0, HoldRuleTypes.MinSellIfHighEquityPercent, PropertyType.SingleFamily)],
      loanSettings: [{ value: 3, propertyType: PropertyType.SingleFamily, name: LoanSettings.LoanTermInYears }],
      getBalance: jest.fn(),
      hasMoneyToInvest: jest.fn(),
      hasMinimumSavings: jest.fn().mockReturnValue(true),
      getMinimumSavings: jest.fn().mockReturnValue(0),
      addLedgerItem: jest.fn(),
      monthlySavedAmount: chance.integer({ min: 1, max: 10 }),
      clone: jest.fn().mockReturnThis(),
    } as jest.Mocked<IUser>;

    rentalGeneratorHome = {
      getRentals: jest.fn(),
      removeRentalById: jest.fn(),
    } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  });

  afterEach(() => {
    chance = null;
    user = null;
    rentalGeneratorHome = null;

    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  describe('and updateHistoricalRentals unit test', () => {
    describe('and no existing rentals', () => {
      describe('and no new rentals', () => {
        test('should return collection', () => {
          rentalGeneratorHome.getRentals.mockReturnValueOnce([]);

          const updateHistoricalRentals = require('../../src/time/update-historical-rentals').updateHistoricalRentals;

          const expected: IHistoricalProperty[] = [];

          expect(updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, [], new Date(), user)).toEqual(
            expected
          );
        });

        describe('and new generated rentals', () => {
          test('should return collection', () => {
            const singleFamily = new RentalSingleFamily();

            rentalGeneratorHome.getRentals.mockReturnValueOnce([singleFamily]);

            const updateHistoricalRentals = require('../../src/time/update-historical-rentals').updateHistoricalRentals;

            const expected: IHistoricalProperty[] = [{ property: singleFamily, reasons: [] }];

            expect(updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, [], new Date(), user)).toEqual(
              expected
            );
          });
        });
      });
    });
    describe('and existing rentals', () => {
      let historical: IHistoricalProperty[];
      let singleFamily: jest.Mocked<RentalSingleFamily>;

      beforeEach(() => {
        singleFamily = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
        singleFamily.address = 'sf addy';
        singleFamily.id = 'sf-id';
        Object.defineProperty(singleFamily, 'propertyType', {
          value: PropertyType.SingleFamily,
        });

        singleFamily.clone.mockReturnThis();

        historical = [{ property: singleFamily, reasons: [] }];
      });

      describe('and no new rentals', () => {
        test('should return collection', () => {
          rentalGeneratorHome.getRentals.mockReturnValueOnce([]);

          const updateHistoricalRentals = require('../../src/time/update-historical-rentals').updateHistoricalRentals;

          expect(
            updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, historical, new Date(), user)
          ).toEqual(historical);
        });

        describe('and new generated rentals', () => {
          test('should return collection', () => {
            const newRental = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
            newRental.address = 'new sf addy';
            newRental.id = 'new sf-id';
            Object.defineProperty(newRental, 'propertyType', {
              value: PropertyType.SingleFamily,
            });
            newRental.clone.mockReturnThis();

            rentalGeneratorHome.getRentals.mockReturnValueOnce([newRental]);

            const updateHistoricalRentals = require('../../src/time/update-historical-rentals').updateHistoricalRentals;

            const expected: IHistoricalProperty[] = historical.concat([{ property: newRental, reasons: [] }]);

            expect(
              updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, historical, new Date(), user)
            ).toEqual(expected);
          });
        });
      });
    });
  });
});
