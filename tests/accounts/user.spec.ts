import { Chance } from 'chance';
import { PropertyType } from '../../src/properties/property-type';
import { User } from '../../src/account/user';
import { ILedgerCollection } from '../../src/ledger/ledger-collection';
import { LoanSettings } from '../../src/loans/loan-settings';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { IRentalPropertyEntity } from '../../src/properties/i-rental-property-entity';

describe('User unit tests', () => {
  let chance: Chance.Chance;
  let instance: User;
  let ledgerCollection: jest.Mocked<ILedgerCollection>;

  beforeEach(() => {
    chance = new Chance();
    ledgerCollection = {
      getAverageCashFlowMonthByQuarter: jest.fn(),
      getCashFlowQuarter: jest.fn(),
      getAvailableSavings: jest.fn(),
      filter: jest.fn(),
      getMonthlyCashFlowByYear: jest.fn(),
      add: jest.fn(),
      getCashFlowYearAverage: jest.fn(),
      getBalance: jest.fn(),
      getCashFlowMonth: jest.fn(),
      getMinimumSavings: jest.fn(),
      getSummariesAnnual: jest.fn(),
      getSummaryAnnual: jest.fn(),
      getSummaryMonth: jest.fn(),
      hasMinimumSavings: jest.fn(),
      getLatestLedgerItem: jest.fn(),
      getLastLedgerMonth: jest.fn(),
      clone: jest.fn(),
    } as jest.Mocked<ILedgerCollection>;

    instance = new User(ledgerCollection);
  });

  afterEach(() => {
    chance = null;
    ledgerCollection = null;
    instance = null;

    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  describe('and hasMinimumSavings', () => {
    test('should return result', () => {
      const expected = chance.bool();
      const date = new Date();
      const minNum = chance.integer({ min: 1, max: 12 });
      const properties: IRentalPropertyEntity[] = [];

      instance.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.MinimumMonthlyReservesForRental,
          value: minNum,
        },
      ];

      ledgerCollection.hasMinimumSavings.mockReturnValueOnce(expected);

      expect(instance.hasMinimumSavings(date, properties)).toEqual(expected);
      expect(ledgerCollection.hasMinimumSavings).toHaveBeenCalledWith(properties, date, minNum);
    });
  });

  describe('and hasMoneyToInvest', () => {
    describe('and null rentals', () => {
      test('should return false', () => {
        const expected = chance.integer({ min: 1, max: 12 });
        const date = new Date();

        ledgerCollection.getBalance.mockReturnValueOnce(expected);

        expect(instance.hasMoneyToInvest(date, null)).toEqual(false);
        expect(ledgerCollection.getBalance).toHaveBeenCalledWith(date);
      });
    });
    describe('and empty rentals', () => {
      test('should return false', () => {
        const expected = chance.integer({ min: 1, max: 12 });
        const date = new Date();

        ledgerCollection.getBalance.mockReturnValueOnce(expected);

        expect(instance.hasMoneyToInvest(date, [])).toEqual(false);
        expect(ledgerCollection.getBalance).toHaveBeenCalledWith(date);
      });
    });
    describe('and populated rentals', () => {
      describe('and no contribution', () => {
        test('should return true', () => {
          const expected = chance.integer({ min: 1, max: 12 });
          instance.getAvailableSavings = jest.fn().mockReturnValue(expected);
          const date = new Date();

          const rental = new RentalSingleFamily();

          expect(instance.hasMoneyToInvest(date, [rental])).toEqual(true);
        });
      });
      describe('and contribution', () => {
        describe('and balance greater than 0', () => {
          test('should return true', () => {
            const expected = chance.integer({ min: 1, max: 12 });
            const contribution = chance.integer({ min: 1, max: expected });

            instance.getAvailableSavings = jest.fn().mockReturnValue(expected);
            const date = new Date();

            const rental = new RentalSingleFamily();

            expect(instance.hasMoneyToInvest(date, [rental], contribution)).toEqual(true);
          });
        });

        describe('and balance less than 0', () => {
          test('should return false', () => {
            const expected = chance.integer({ min: 1, max: 12 });
            const contribution = chance.integer({ min: expected + 1, max: expected + 20 });

            instance.getAvailableSavings = jest.fn().mockReturnValue(expected);
            const date = new Date();

            const rental = new RentalSingleFamily();

            expect(instance.hasMoneyToInvest(date, [rental], contribution)).toEqual(false);
          });
        });
      });
    });
  });

  describe('and getMinimumSavings', () => {
    let minNum: number;

    beforeEach(() => {
      minNum = chance.integer();

      instance.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.MinimumMonthlyReservesForRental,
          value: minNum,
        },
      ];
    });

    test('should match', () => {
      const minSavings = chance.integer({ min: 10, max: 40 });
      const date = new Date();
      const properties: IRentalPropertyEntity[] = [];

      ledgerCollection.getMinimumSavings.mockReturnValueOnce(minSavings);

      expect(instance.getMinimumSavings(date, properties)).toEqual(minSavings);
      expect(ledgerCollection.getMinimumSavings).toHaveBeenCalledWith(properties, date, minNum);
    });
  });

  describe('and metMonthlyGoal', () => {
    test('should be true', () => {
      const date = new Date();

      const expected = 500;

      instance.monthlyIncomeAmountGoal = 500;

      ledgerCollection.getCashFlowMonth.mockReturnValue(expected);

      expect(instance.metMonthlyGoal(date)).toBeTruthy();
      expect(instance.getCashFlowMonth(date)).toEqual(expected);
    });

    test('should be false', () => {
      const date = new Date();

      const expected = 499;

      instance.monthlyIncomeAmountGoal = 500;

      ledgerCollection.getCashFlowMonth.mockReturnValue(expected);

      expect(instance.metMonthlyGoal(date)).toBeFalsy();
      expect(instance.getCashFlowMonth(date)).toEqual(expected);
    });
  });

  describe('and metAverageQuarterlyGoal', () => {
    test('should be true', () => {
      const date = new Date();

      const expected = 500;

      instance.monthlyIncomeAmountGoal = 500;

      ledgerCollection.getAverageCashFlowMonthByQuarter.mockReturnValue(expected);

      expect(instance.metAverageQuarterlyGoal(date)).toBeTruthy();
      expect(instance.getCashFlowQuarter(date)).toEqual(expected);
    });

    test('should be false', () => {
      const date = new Date();

      const expected = 499;

      instance.monthlyIncomeAmountGoal = 500;

      ledgerCollection.getCashFlowMonth.mockReturnValue(expected);

      expect(instance.metMonthlyGoal(date)).toBeFalsy();
      expect(instance.getCashFlowMonth(date)).toEqual(expected);
    });
  });
});
