import { cloneDateUtc } from '../../src/utils/data-clone-date';
import { ILoopOptions, loop } from '../../src/time/movement';
import { Chance } from 'chance';
import { ITimeline } from '../../src/time/i-timeline';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { IRentalGenerator } from '../../src/generators/rental-generator';
import { IHistoricalProperty } from '../../src/time/i-historical-property';
import { IUser } from '../../src/account/user';
import { LedgerItem } from '../../src/ledger/ledger-item';
import { LedgerItemType } from '../../src/ledger/ledger-item-type';
import { RuleEvaluation } from '../../src/rules/rule-evaluation';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { PropertyType } from '../../src/account/property-type';
import { LoanSettings } from '../../src/account/loan-settings';

jest.mock('../../src/properties/rental-single-family');

describe('movement unit tests', () => {
  let chance: Chance.Chance;
  let rentalGenerator: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  let user: jest.Mocked<IUser>;

  beforeEach(() => {
    chance = new Chance();

    user = {
      ledgerCollection: null,
      getCashFlowMonth: jest.fn(),
      metMonthlyGoal: jest.fn(),
      monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
      purchaseRules: [new RuleEvaluation(4, PurchaseRuleTypes.minEstimatedCashFlowPerMonth, PropertyType.SingleFamily)],
      loanSettings: [{ value: 3, propertyType: PropertyType.SingleFamily, name: LoanSettings.loanTermInYears }],
      getBalance: jest.fn(),
      hasMoneyToInvest: jest.fn().mockReturnValue(true),
      hasMinimumSavings: jest.fn().mockReturnValue(true),
      getMinimumSavings: jest.fn().mockReturnValue(0),
      addLedgerItem: jest.fn(),
      monthlySavedAmount: chance.integer({ min: 1, max: 10 }),
      clone: jest.fn(),
      getSummaryAnnual: jest.fn(),
      getSummaryMonth: jest.fn(),
      getSummariesAnnual: jest.fn(),
    } as jest.Mocked<IUser>;

    user.clone.mockReturnValueOnce(user);
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
    let hasMetGoalOrMaxTime: jest.Mock;

    beforeEach(() => {
      hasMetGoalOrMaxTime = jest.fn();
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
        hasMetGoalOrMaxTime.mockReturnValueOnce(false);
        hasMetGoalOrMaxTime.mockReturnValueOnce(false);
        hasMetGoalOrMaxTime.mockReturnValueOnce(false);
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);
        options = {
          startDate,
          maxYears,
          propertyGeneratorSingleFamily: rentalGenerator,
          hasMetGoalOrMaxTime,
        };
      });

      test('should loop 4 months', () => {
        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 4)),
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

        expect(user.addLedgerItem).toHaveBeenNthCalledWith(4, expect.objectContaining(ledgerItemCashFlow));
        expect(user.addLedgerItem).toHaveBeenNthCalledWith(7, expect.objectContaining(ledgerItemSalary));
      });

      test('and no monthlySavedAmount, should loop 4 months', () => {
        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 4)),
          rentals: [],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([]);

        user.monthlySavedAmount = 0;

        expect(loop(options, user)).toEqual(expected);

        expect(user.addLedgerItem).not.toBeCalled();
      });
    });

    describe('and invalid loanSettings', () => {
      let options: ILoopOptions;
      beforeEach(() => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);
        options = {
          startDate,
          maxYears,
          propertyGeneratorSingleFamily: rentalGenerator,
          hasMetGoalOrMaxTime,
        };
      });

      test('should throw loanSettings error on empty', () => {
        user.loanSettings = [];

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 4)),
          rentals: [{ property: rental, reasons: [] }],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);
        expect(() => loop(options, user)).toThrow('no single family loan settings for user: loanSettings');
      });

      test('should throw loanSettings error on no single family', () => {
        user.loanSettings = [{ name: LoanSettings.loanTermInYears, propertyType: PropertyType.None, value: 6 }];

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 4)),
          rentals: [{ property: rental, reasons: [] }],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);
        expect(() => loop(options, user)).toThrow('no single family loan settings for user: loanSettings');
      });
    });

    describe('and invalid purchaseRules', () => {
      let options: ILoopOptions;
      beforeEach(() => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);
        options = {
          startDate,
          maxYears,
          propertyGeneratorSingleFamily: rentalGenerator,
          hasMetGoalOrMaxTime,
        };
      });

      test('should throw purchaseRules error on empty', () => {
        user.purchaseRules = [];

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 4)),
          rentals: [{ property: rental, reasons: [] }],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);
        expect(() => loop(options, user)).toThrow('no single family purchase rules for user: purchaseRules');
      });

      test('should throw loanSettings error on no single family', () => {
        user.purchaseRules = [new RuleEvaluation(5, PurchaseRuleTypes.minEstimatedCapitalGains, PropertyType.None)];

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 4)),
          rentals: [{ property: rental, reasons: [] }],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);
        expect(() => loop(options, user)).toThrow('no single family purchase rules for user: purchaseRules');
      });
    });

    describe('and custom while check', () => {
      let options: ILoopOptions;

      beforeEach(() => {
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
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 1)),
          rentals: [],
          user,
        };

        expect(loop(options, user)).toEqual(expected);
        expect(rentalGenerator.getRentals).toBeCalledWith(RentalSingleFamily, expect.any(Date), user.loanSettings);
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
        expect(rentalGenerator.getRentals).toBeCalledWith(RentalSingleFamily, expect.any(Date), user.loanSettings);
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
        expect(rentalGenerator.getRentals).toBeCalledWith(RentalSingleFamily, expect.any(Date), user.loanSettings);
      });

      test('and properties to cash flow', () => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.isOwned = true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.minSellDate = new Date(rental.purchaseDate);
        rental.canSell.mockReturnValueOnce(false);
        rental.getEquityFromSell.mockReturnValueOnce(22222);

        rentalGenerator.getRentals.mockReturnValueOnce([rental]);

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 1)),
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

        const ledgerCashFlow = new LedgerItem();
        ledgerCashFlow.amount = expectedCashFlow;
        ledgerCashFlow.created = cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 1));
        ledgerCashFlow.note = 'for: rental.address, id: rental.id';
        ledgerCashFlow.type = LedgerItemType.CashFlow;

        expect(user.addLedgerItem).toBeCalledWith(ledgerCashFlow);
      });

      test('and properties sell, should do it', () => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.isOwned = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.minSellDate = new Date(rental.purchaseDate);
        rental.canSell.mockReturnValueOnce(true);
        rental.getEquityFromSell.mockReturnValueOnce(22222);

        rentalGenerator.getRentals.mockReturnValueOnce([rental]);

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 1)),
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

        const ledgerEquity = new LedgerItem();
        ledgerEquity.amount = 22222;
        ledgerEquity.created = cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 1));
        ledgerEquity.note = 'for: rental.address, id: rental.id';
        ledgerEquity.type = LedgerItemType.Equity;

        expect(user.addLedgerItem).toBeCalledWith(ledgerEquity);
      });

      test('and properties to purchase, should do it', () => {
        hasMetGoalOrMaxTime.mockReturnValueOnce(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.isOwned = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rental.minSellDate = new Date(rental.purchaseDate);
        rental.canSell.mockReturnValueOnce(false);
        rental.isAvailableByDate.mockReturnValueOnce(true);
        rental.canInvestByUser.mockReturnValueOnce({ canInvest: true, results: [] });
        rental.getEquityFromSell.mockReturnValueOnce(22222);

        rentalGenerator.getRentals.mockReturnValueOnce([rental]);

        expected = {
          startDate: cloneDateUtc(startDate),
          endDate: cloneDateUtc(startDate, (date: Date) => date.setUTCMonth(date.getUTCMonth() + 1)),
          rentals: [
            {
              property: rental,
              reasons: [],
            },
          ],
          user,
        };

        rentalGenerator.getRentals.mockReturnValue([rental]);

        user.hasMoneyToInvest.mockReturnValueOnce(true);
        user.monthlySavedAmount = 0;

        expect(loop(options, user)).toEqual(expected);

        const purchase = new LedgerItem();
        purchase.amount = rental.costDownPrice;
        purchase.type = LedgerItemType.Purchase;
        purchase.created = cloneDateUtc(expected.endDate);
        purchase.note = `for: ${rental.address}, id: ${rental.id}`;

        expect(user.addLedgerItem).toBeCalledWith(purchase);
      });
    });
  });
});
