import { Chance } from 'chance';
import { PropertyType } from '../../src/account/property-type';
import { User } from '../../src/account/user';
import { ILedgerCollection } from '../../src/ledger/ledger-collection';
import { LedgerItem } from '../../src/ledger/ledger-item';
import { IRentalSavings } from '../../src/properties/i-rental-savings';
import { LoanSettings } from '../../src/account/loan-settings';

describe('User unit tests', () => {
  let chance: Chance.Chance;
  let instance: User;
  let ledgerCollection: jest.Mocked<ILedgerCollection>;

  beforeEach(() => {
    chance = new Chance();
    ledgerCollection = {
      filter: jest.fn(),
      add: jest.fn(),
      getBalance: jest.fn(),
      getCashFlowMonth: jest.fn(),
      getMinimumSavings: jest.fn(),
      getSummariesAnnual: jest.fn(),
      getSummaryAnnual: jest.fn(),
      getSummaryMonth: jest.fn(),
      hasMinimumSavings: jest.fn(),
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

  describe('and getLedgerBalance', () => {
    describe('and success', () => {
      test('should call balance', () => {
        const date = new Date();
        const balance = chance.integer({ min: 0, max: 20000 });
        ledgerCollection.getBalance.mockReturnValueOnce(balance);
        expect(instance.getBalance(date)).toEqual(balance);
        expect(ledgerCollection.getBalance).toBeCalledWith(date);
      });
    });
  });

  describe('and addLedgerItem', () => {
    test('should append', () => {
      const expected = new LedgerItem();
      const balance = chance.integer({ min: 0, max: 20000 });
      ledgerCollection.getBalance.mockReturnValueOnce(balance);
      instance.addLedgerItem(expected);
      expect(ledgerCollection.add).toBeCalledWith(expected);
    });
  });

  describe('and hasMinimumSavings', () => {
    test('should return result', () => {
      const expected = chance.bool();
      const date = new Date();
      const minNum = chance.integer({ min: 1, max: 12 });
      const properties: IRentalSavings[] = [];

      instance.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.minimumReservesSingleFamily,
          value: minNum,
        },
      ];

      ledgerCollection.hasMinimumSavings.mockReturnValueOnce(expected);

      expect(instance.hasMinimumSavings(date, properties)).toEqual(expected);
      expect(ledgerCollection.hasMinimumSavings).toBeCalledWith(date, properties, minNum);
    });
  });

  describe('and hasMoneyToInvest', () => {
    test('should return result', () => {
      const expected = chance.integer({ min: 1, max: 12 });
      const date = new Date();

      ledgerCollection.getBalance.mockReturnValueOnce(expected);

      expect(instance.hasMoneyToInvest(date)).toEqual(true);
      expect(ledgerCollection.getBalance).toBeCalledWith(date);
    });
  });

  describe('and getMinimumSavings', () => {
    let minNum: number;

    beforeEach(() => {
      minNum = chance.integer();

      instance.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.minimumReservesSingleFamily,
          value: minNum,
        },
      ];
    });

    test('should match', () => {
      const minSavings = chance.integer({ min: 10, max: 40 });
      const date = new Date();
      const properties: IRentalSavings[] = [];

      ledgerCollection.getMinimumSavings.mockReturnValueOnce(minSavings);

      expect(instance.getMinimumSavings(date, properties)).toEqual(minSavings);
      expect(ledgerCollection.getMinimumSavings).toBeCalledWith(date, properties, minNum);
    });
  });

  describe('and getSummaryMonth', () => {
    test('should match', () => {
      const date = new Date();

      const expected = {
        averageCashFlow: 0,
        balance: 0,
        cashFlow: 0,
        date,
        equity: 0,
        purchases: 0,
      };

      ledgerCollection.getSummaryMonth.mockReturnValueOnce(expected);

      expect(instance.getSummaryMonth(date)).toEqual(expected);
      expect(ledgerCollection.getSummaryMonth).toBeCalledWith(date);
    });
  });

  describe('and getCashFlowMonth', () => {
    test('should match', () => {
      const date = new Date();

      const expected = 500;

      ledgerCollection.getCashFlowMonth.mockReturnValueOnce(expected);

      expect(instance.getCashFlowMonth(date)).toEqual(expected);
      expect(ledgerCollection.getCashFlowMonth).toBeCalledWith(date);
    });
  });

  describe('and metMonthlyGoal', () => {
    test('should be true', () => {
      const date = new Date();

      const expected = 500;

      ledgerCollection.getCashFlowMonth.mockReturnValueOnce(expected);
      instance.monthlyIncomeAmountGoal = 500;

      expect(instance.metMonthlyGoal(date)).toBeTruthy();
      expect(ledgerCollection.getCashFlowMonth).toBeCalledWith(date);
    });

    test('should be false', () => {
      const date = new Date();

      const expected = 499;

      ledgerCollection.getCashFlowMonth.mockReturnValueOnce(expected);
      instance.monthlyIncomeAmountGoal = 500;

      expect(instance.metMonthlyGoal(date)).toBeFalsy();
      expect(ledgerCollection.getCashFlowMonth).toBeCalledWith(date);
    });
  });

  describe('and getSummaryAnnual', () => {
    test('should match', () => {
      const year = chance.integer();

      const expected = {
        averageCashFlow: 0,
        balance: 0,
        cashFlow: 0,
        date: new Date(),
        equity: 0,
        purchases: 0,
      };

      ledgerCollection.getSummaryAnnual.mockReturnValueOnce(expected);

      expect(instance.getSummaryAnnual(year)).toEqual(expected);
      expect(ledgerCollection.getSummaryAnnual).toBeCalledWith(year);
    });
  });

  describe('and getSummariesAnnual', () => {
    test('should match', () => {
      const year = chance.integer();

      const expected = {
        averageCashFlow: 0,
        balance: 0,
        cashFlow: 0,
        date: new Date(),
        equity: 0,
        purchases: 0,
      };

      ledgerCollection.getSummariesAnnual.mockReturnValueOnce([expected]);

      expect(instance.getSummariesAnnual(year)).toEqual([expected]);
      expect(ledgerCollection.getSummariesAnnual).toBeCalledWith(year);
    });
  });
});
