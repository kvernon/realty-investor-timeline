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
      loanSettings: [],
      getLedgerBalance: jest.fn(),
      hasMoneyToInvest: jest.fn(),
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

    beforeEach(() => {
      maxYears = chance.integer({ min: 1, max: 2 });
      startDate = new Date(Date.now());

      expected = {
        startDate: new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1),
        endDate: new Date(startDate.getUTCFullYear() + maxYears, startDate.getUTCMonth(), 1),
        rentals: [],
        user,
      };

      rentalGenerator = {
        getRentals: jest.fn(),
        removeRentalById: jest.fn(),
      } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
    });

    describe('and default while check', () => {
      let options: ILoopOptions;

      beforeEach(() => {
        rentalGenerator.getRentals.mockReturnValue([]);

        options = {
          startDate,
          maxYears,
          propertyGeneratorSingleFamily: rentalGenerator,
        };
      });

      test('should loop maxYears times 12 months', () => {
        expect(loop(options, user)).toEqual(expected);

        const ledgerItem = new LedgerItem();
        ledgerItem.amount = user.monthlySavedAmount;
        ledgerItem.type = LedgerItemType.Salary;
        ledgerItem.note = 'saved for month';

        expect(user.ledger.add).toHaveBeenNthCalledWith(maxYears * 12, expect.objectContaining(ledgerItem));
        expect(user.ledger.add).toBeCalledTimes(maxYears * 12);
      });

      test('and no monthlySavedAmount, should loop maxYears times 12 months', () => {
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
          startDate: new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1),
          endDate: new Date(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 1),
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
    });
  });
});
