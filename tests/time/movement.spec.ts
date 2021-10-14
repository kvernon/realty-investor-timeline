jest.mock('../../src/properties/rental-single-family');

import { ILoopOptions, loop } from '../../src/time/movement';
import { Chance } from 'chance';
import { ITimeline } from '../../src/time/i-timeline';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { IRentalGenerator } from '../../src/generators/rental-generator';
import { IHistoricalProperty } from '../../src/time/i-historical-property';
import { IUser } from '../../src/account/i-user';
import { IUserGoal } from '../../src/account/i-user-goal';
import { ILedgerCollection } from '../../src/ledger/ledger-collection';
import { LedgerItem } from '../../src/ledger/ledger-item';
import { LedgerItemType } from '../../src/ledger/ledger-item-type';

describe('movement unit tests', () => {
  let chance: Chance.Chance;
  let rentalGenerator: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  let user: jest.Mocked<IUser>;

  beforeEach(() => {
    chance = new Chance();

    const goals: jest.Mocked<IUserGoal> = {
      metMonthlyGoal: jest.fn(),
      monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
    } as jest.Mocked<IUserGoal>;

    const ledger: jest.Mocked<Partial<ILedgerCollection>> = {
      add: jest.fn(),
    } as jest.Mocked<Partial<ILedgerCollection>>;

    user = {
      ledger,
      goals,
      purchaseRules: [],
      loanSettings: [],
      getLedgerBalance: jest.fn(),
      hasMoneyToInvest: jest.fn().mockReturnValue(true),
      monthlySavedAmount: chance.integer({ min: 1, max: 10 }),
    } as jest.Mocked<IUser>;
  });

  afterEach(() => {
    chance = null;
    user = null;
    rentalGenerator = null;
  });

  describe('and loop', () => {
    let maxYears: number;
    let startDate: Date;
    let expected: ITimeline;
    let rental: jest.Mocked<RentalSingleFamily>;
    let expectedCashFlow: number;
    beforeEach(() => {
      maxYears = chance.integer({ min: 1, max: 2 });
      startDate = new Date(Date.now());

      rental = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
      expectedCashFlow = chance.integer({ min: 100, max: 200 });
      rental.getMonthlyCashFlowByDate.mockReturnValue(expectedCashFlow);
      rental.id = 'rental.id';
      rental.address = 'rental.address';

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rental.isOwned = true;

      rentalGenerator = {
        getRentals: jest.fn(),
        removeRentalById: jest.fn(),
      } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
    });

    describe('and default while check', () => {
      let options: ILoopOptions;

      beforeEach(() => {
        options = {
          startDate,
          maxYears,
          propertyGeneratorSingleFamily: rentalGenerator,
        };
      });

      test('should loop maxYears times 12 months', () => {
        expected = {
          startDate: new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1)),
          endDate: new Date(Date.UTC(startDate.getUTCFullYear() + maxYears, startDate.getUTCMonth(), 1)),
          rentals: [{ property: rental, reasons: [] }],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);
        expect(loop(options, user)).toEqual(expected);

        const ledgerItemSalary = new LedgerItem();
        ledgerItemSalary.amount = user.monthlySavedAmount;
        ledgerItemSalary.type = LedgerItemType.Salary;
        ledgerItemSalary.note = 'saved for month';

        const ledgerItemCashFlow = new LedgerItem();
        ledgerItemCashFlow.amount = rental.getMonthlyCashFlowByDate(null);
        ledgerItemCashFlow.type = LedgerItemType.CashFlow;
        ledgerItemCashFlow.note = `for: ${rental.address}, id: ${rental.id}`;

        expect(user.ledger.add).toHaveBeenNthCalledWith(maxYears * 12, expect.objectContaining(ledgerItemCashFlow));
        expect(user.ledger.add).toHaveBeenNthCalledWith(23, expect.objectContaining(ledgerItemSalary));
      });

      test('and no monthlySavedAmount, should loop maxYears times 12 months', () => {
        expected = {
          startDate: new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1)),
          endDate: new Date(Date.UTC(startDate.getUTCFullYear() + maxYears, startDate.getUTCMonth(), 1)),
          rentals: [],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([]);

        user.monthlySavedAmount = 0;

        expect(loop(options, user)).toEqual(expected);

        expect(user.ledger.add).not.toBeCalled();
      });
    });

    describe('and custom while check', () => {
      let options: ILoopOptions;
      let hasMetGoalOrMaxTime: jest.Mock;

      beforeEach(() => {
        hasMetGoalOrMaxTime = jest.fn();
        options = {
          startDate,
          maxYears,
          hasMetGoalOrMaxTime,
          propertyGeneratorSingleFamily: rentalGenerator,
        };
      });

      test('should loop with only 1 month advance', () => {
        rentalGenerator.getRentals.mockReturnValueOnce([]);
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        const expected: ITimeline = {
          startDate: new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1)),
          endDate: new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 1)),
          rentals: [],
          user,
        };

        expect(loop(options, user)).toEqual(expected);
        expect(rentalGenerator.getRentals).toBeCalledWith(RentalSingleFamily, user.loanSettings);
      });

      test('should add rentals', () => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        const rentalSingleFamilies: IHistoricalProperty[] = [
          { property: new RentalSingleFamily(), reasons: [] },
          { property: new RentalSingleFamily(), reasons: [] },
          { property: new RentalSingleFamily(), reasons: [] },
        ];

        rentalGenerator.getRentals.mockReturnValue(<RentalSingleFamily[]>rentalSingleFamilies.map((x) => x.property));

        expect(loop(options, user).rentals).toEqual(rentalSingleFamilies);
        expect(rentalGenerator.getRentals).toBeCalledWith(RentalSingleFamily, user.loanSettings);
      });

      test('should contain no duplicate rentals', () => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(false);
        hasMetGoalOrMaxTime.mockReturnValueOnce(false);
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        const sf1 = new RentalSingleFamily();
        sf1.id = '1';
        const sf2 = new RentalSingleFamily();
        sf2.id = '2';
        const sf3 = new RentalSingleFamily();
        sf3.id = '3';

        const rentalSingleFamiliesOne: IHistoricalProperty[] = [
          { property: sf1, reasons: [] },
          { property: sf2, reasons: [] },
          { property: sf3, reasons: [] },
        ];

        const sf4 = new RentalSingleFamily();
        sf4.id = '4';
        const sf5 = new RentalSingleFamily();
        sf5.id = '5';
        const rentalSingleFamiliesTwo: IHistoricalProperty[] = [
          { property: sf4, reasons: [] },
          { property: sf5, reasons: [] },
        ];

        rentalGenerator.getRentals.mockReturnValueOnce(
          <RentalSingleFamily[]>rentalSingleFamiliesOne.map((x) => x.property)
        );
        rentalGenerator.getRentals.mockReturnValueOnce([sf3]);
        rentalGenerator.getRentals.mockReturnValueOnce(
          <RentalSingleFamily[]>rentalSingleFamiliesTwo.map((x) => x.property)
        );

        const expected = rentalSingleFamiliesOne.concat(rentalSingleFamiliesTwo);
        expect(loop(options, user).rentals).toEqual(expected);
        expect(rentalGenerator.getRentals).toBeCalledWith(RentalSingleFamily, user.loanSettings);
      });

      test('and properties to sell, should do it', () => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.isOwned = true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.minSellDate = new Date(rental.purchaseDate);
        rental.canSell.mockReturnValueOnce(true);
        rental.getEquityFromSell.mockReturnValueOnce(22222);

        rentalGenerator.getRentals.mockReturnValueOnce([rental]);

        expected = {
          startDate: new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1)),
          endDate: new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 1)),
          rentals: [
            {
              property: rental,
              reasons: [],
            },
          ],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);

        user.monthlySavedAmount = 0;

        expect(loop(options, user)).toEqual(expected);

        const ledgerCashflow = new LedgerItem();
        ledgerCashflow.amount = expectedCashFlow;
        ledgerCashflow.created = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 1));
        ledgerCashflow.note = 'for: rental.address, id: rental.id';
        ledgerCashflow.type = LedgerItemType.CashFlow;

        const ledgerEquity = new LedgerItem();
        ledgerEquity.amount = 22222;
        ledgerEquity.created = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 1));
        ledgerEquity.note = 'for: rental.address, id: rental.id';
        ledgerEquity.type = LedgerItemType.Equity;

        expect(user.ledger.add).toBeCalledWith(ledgerCashflow);
        expect(user.ledger.add).toBeCalledWith(ledgerEquity);
      });
    });
  });
});
