import { Chance } from 'chance';
import { PropertyType } from '../../src/properties/property-type';
import { User } from '../../src/account/user';
import { ILedgerCollection } from '../../src/ledger/ledger-collection';
import { LedgerItem } from '../../src/ledger/ledger-item';
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
      getAvailableSavings: jest.fn(),
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
      expect(ledgerCollection.hasMinimumSavings).toBeCalledWith(date, properties, minNum);
    });
  });

  describe('and hasMoneyToInvest', () => {
    describe('and null rentals', () => {
      test('should return false', () => {
        const expected = chance.integer({ min: 1, max: 12 });
        const date = new Date();

        ledgerCollection.getBalance.mockReturnValueOnce(expected);

        expect(instance.hasMoneyToInvest(date, null)).toEqual(false);
        expect(ledgerCollection.getBalance).toBeCalledWith(date);
      });
    });
    describe('and empty rentals', () => {
      test('should return false', () => {
        const expected = chance.integer({ min: 1, max: 12 });
        const date = new Date();

        ledgerCollection.getBalance.mockReturnValueOnce(expected);

        expect(instance.hasMoneyToInvest(date, [])).toEqual(false);
        expect(ledgerCollection.getBalance).toBeCalledWith(date);
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

  describe('and metMonthlyGoal', () => {
    let rental: jest.Mocked<IRentalPropertyEntity>;
    beforeEach(() => {
      rental = {
        rawEstimatedAnnualCashFlow: 0,
        getExpensesByDate: jest.fn(),
        getEstimatedMonthlyCashFlow: jest.fn(),
        offeredInvestmentAmounts: [0],
        propertyType: PropertyType.SingleFamily,
        clone: jest.fn().mockReturnThis(),
        equityCapturePercent: 0,
        minSellYears: 0,
        rawCashFlow: 0,
        address: '',
        availableEndDate: new Date(),
        availableStartDate: new Date(),
        id: '',
        isOwned: false,
        purchaseDate: undefined,
        purchasePrice: 0,
        sellPriceAppreciationPercent: 0,
        soldDate: undefined,
        canInvestByUser: jest.fn(),
        canSell: jest.fn(),
        get costDownPrice(): number {
          return 0;
        },
        getEquityFromSell: jest.fn(),
        getCashFlowByDate: jest.fn(),
        isAvailableByDate: jest.fn(),
      };
    });

    test('should be true', () => {
      const date = new Date();

      const expected = 500;

      rental.getEstimatedMonthlyCashFlow.mockReturnValue(expected);

      instance.monthlyIncomeAmountGoal = 500;

      expect(instance.metMonthlyGoal(date, [rental])).toBeTruthy();
      expect(instance.getEstimatedMonthlyCashFlow(date, [rental])).toEqual(expected);
      expect(rental.getEstimatedMonthlyCashFlow).toBeCalledWith(date);
    });

    test('should be false', () => {
      const date = new Date();

      const expected = 499;

      instance.monthlyIncomeAmountGoal = 500;

      rental.getEstimatedMonthlyCashFlow.mockReturnValue(expected);

      expect(instance.metMonthlyGoal(date, [rental])).toBeFalsy();
      expect(instance.getEstimatedMonthlyCashFlow(date, [rental])).toEqual(expected);
      expect(rental.getEstimatedMonthlyCashFlow).toBeCalledWith(date);
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
