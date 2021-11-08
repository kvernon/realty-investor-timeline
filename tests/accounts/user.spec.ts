import { Chance } from 'chance';
import { PropertyType } from '../../src/account/property-type';
import { User } from '../../src/account/user';
import { ILedgerCollection } from '../../src/ledger/ledger-collection';
import { LedgerItem } from '../../src/ledger/ledger-item';
import { IRentalSavings } from '../../src/properties/i-rental-savings';
import { LoanSettings } from '../../src/account/loan-settings';
import { IPropertyEntity } from '../../src/properties/i-property-entity';

describe('User unit tests', () => {
  let chance: Chance.Chance;
  let instance: User;
  let ledgerCollection: jest.Mocked<ILedgerCollection>;

  beforeEach(() => {
    chance = new Chance();
    ledgerCollection = {
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

  describe('and canInvestInProperty', () => {
    let minNum: number;
    let expectedCostDown: number;
    let newProp: IPropertyEntity;

    beforeEach(() => {
      minNum = chance.integer();

      instance.loanSettings = [
        {
          propertyType: PropertyType.SingleFamily,
          name: LoanSettings.minimumReservesSingleFamily,
          value: minNum,
        },
      ];
      expectedCostDown = chance.integer({ min: 1, max: 9 });

      newProp = {
        equityCapturePercent: 0,
        monthlyCashFlow: 0,
        address: chance.address(),
        availableEndDate: chance.date(),
        availableStartDate: chance.date(),
        id: chance.guid(),
        purchasePrice: 0,
        sellPriceAppreciationPercent: 0,
        get costDownPrice(): number {
          return expectedCostDown;
        },
      };
    });

    test('should be true', () => {
      const minSavings = chance.integer({ min: 10, max: 40 });
      const date = new Date();
      const properties: IRentalSavings[] = [];

      ledgerCollection.getMinimumSavings.mockReturnValueOnce(minSavings);
      ledgerCollection.getBalance.mockReturnValueOnce(minSavings + expectedCostDown);

      expect(instance.canInvestInProperty(date, properties, newProp)).toEqual(true);
      expect(ledgerCollection.getMinimumSavings).toBeCalledWith(date, properties, minNum);
    });

    test('should be false', () => {
      const minSavings = chance.integer({ min: 10, max: 40 });
      const date = new Date();
      const properties: IRentalSavings[] = [];

      ledgerCollection.getMinimumSavings.mockReturnValueOnce(minSavings);
      ledgerCollection.getBalance.mockReturnValueOnce(expectedCostDown);

      expect(instance.canInvestInProperty(date, properties, newProp)).toEqual(false);
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
});
