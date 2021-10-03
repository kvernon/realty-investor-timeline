import { ILoopOptions, loop } from '../../src/time/movement';
import { Chance } from 'chance';
import { ITimeline } from '../../src/time/i-timeline';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { IRentalGenerator } from '../../src/generators/rental-generator';
import { IHistoricalProperty } from '../../src/time/i-historical-property';
import { IUser } from '../../src/account/i-user';

describe('movement unit tests', () => {
  let chance: Chance.Chance;
  let rentalGenerator: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  let user: jest.Mocked<IUser>;

  beforeEach(() => {
    chance = new Chance();
    user = {
      loanSettings: [],
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
      };

      rentalGenerator = {
        getRentals: jest.fn(),
        removeRentalById: jest.fn(),
      } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
    });

    describe('and default while check', () => {
      test('should loop maxYears times 12 months', () => {
        rentalGenerator.getRentals.mockReturnValue([]);

        const options: ILoopOptions = {
          startDate,
          goal: {
            metMonthlyGoal: jest.fn(),
            monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
          },
          maxYears,
          propertyGeneratorSingleFamily: rentalGenerator,
        };

        expect(loop(options, user)).toEqual(expected);
      });
    });

    describe('and custom while check', () => {
      let options: ILoopOptions;
      let hasMetGoalOrMaxTime: jest.Mock;

      beforeEach(() => {
        hasMetGoalOrMaxTime = jest.fn();
        options = {
          startDate,
          goal: {
            metMonthlyGoal: jest.fn(),
            monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
          },
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
