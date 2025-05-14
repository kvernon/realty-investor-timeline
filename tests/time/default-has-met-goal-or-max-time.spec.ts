jest.mock('../../src/account/user');

import { PropertyType } from '../../src/properties/property-type';
import { IUser, User } from '../../src/account/user';
import { defaultHasMetGoalOrMaxTime } from '../../src/time/default-has-met-goal-or-max-time';

describe('defaultHasMetGoalOrMaxTime unit tests', () => {
  describe('and dates same', () => {
    describe('and user null', () => {
      test('should be false', () => {
        const startAndEnd = new Date();
        expect(defaultHasMetGoalOrMaxTime(startAndEnd, startAndEnd, null, [null], 1)).toBeFalsy();
      });
    });

    describe('and rentals falsy', () => {
      test('should be false', () => {
        const startAndEnd = new Date();
        expect(defaultHasMetGoalOrMaxTime(startAndEnd, startAndEnd, new User(null), [null], 1)).toBeFalsy();
      });
    });
  });
  describe('and dates within range', () => {
    describe('and user null', () => {
      describe('today is maxDate', () => {
        test('should be true', () => {
          const start = new Date();
          const maxYears = 1;
          const today = new Date(Date.UTC(start.getUTCFullYear() + maxYears, start.getUTCMonth(), 1));
          expect(defaultHasMetGoalOrMaxTime(start, today, null, [null], maxYears)).toBeTruthy();
        });
      });
      describe('today is half maxDate', () => {
        test('should be false', () => {
          const start = new Date();
          const maxYears = 1;
          const today = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 6, 1));
          expect(defaultHasMetGoalOrMaxTime(start, today, null, [], maxYears)).toBeFalsy();
        });
      });
    });
    describe('and user populated', () => {
      let user: jest.Mocked<IUser>;

      beforeEach(() => {
        user = {
          getAvailableSavings: jest.fn(),
          ledgerCollection: null,
          getEstimatedMonthlyCashFlow: jest.fn(),
          getCashFlowMonth: jest.fn(),
          metMonthlyGoal: jest.fn(),
          monthlyIncomeAmountGoal: 20,
          hasMoneyToInvest: jest.fn(),
          hasMinimumSavings: jest.fn(),
          getMinimumSavings: jest.fn(),
          loanSettings: [],
          monthlySavedAmount: 0,
          holdRules: [],
          purchaseRules: [],
          clone: jest.fn(),
        } as jest.Mocked<IUser>;
      });
      describe('today is maxDate', () => {
        describe('and met goal', () => {
          test('should be true', () => {
            user.metMonthlyGoal.mockReturnValueOnce(true);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear() + maxYears, start.getUTCMonth(), 1));
            expect(
              defaultHasMetGoalOrMaxTime(
                start,
                today,
                user,
                [
                  {
                    isAvailable: false,
                    sellPriceByDate: jest.fn(),
                    getEstimatedEquityFromSell: jest.fn(),
                    estimatedCashOnCashReturn: 0,
                    estimatedReturnOnCapitalGain: 0,
                    wasPurchased: true,
                    rawEstimatedAnnualCashFlow: 0,
                    getExpensesByDate: jest.fn(),
                    getEstimatedMonthlyCashFlow: jest.fn(),
                    offeredInvestmentAmounts: [],
                    propertyType: PropertyType.SingleFamily,
                    clone: jest.fn().mockReturnThis(),
                    equityCapturePercent: 0,
                    minSellYears: 0,
                    rawCashFlow: 0,
                    address: '',
                    availableEndDate: undefined,
                    availableStartDate: undefined,
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
                  },
                ],
                maxYears,
              ),
            ).toBeTruthy();
          });
        });
        describe('and not met goal', () => {
          test('should be truthy', () => {
            user.metMonthlyGoal.mockReturnValueOnce(false);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear() + maxYears, start.getUTCMonth(), 1));
            expect(
              defaultHasMetGoalOrMaxTime(
                start,
                today,
                user,
                [
                  {
                    isAvailable: false,
                    sellPriceByDate: jest.fn(),
                    getEstimatedEquityFromSell: jest.fn(),
                    estimatedCashOnCashReturn: 0,
                    estimatedReturnOnCapitalGain: 0,
                    wasPurchased: true,
                    rawEstimatedAnnualCashFlow: 0,
                    getExpensesByDate: jest.fn(),
                    getEstimatedMonthlyCashFlow: jest.fn(),
                    offeredInvestmentAmounts: [],
                    propertyType: PropertyType.SingleFamily,
                    clone: jest.fn().mockReturnThis(),
                    equityCapturePercent: 0,
                    minSellYears: 0,
                    rawCashFlow: 0,
                    address: '',
                    availableEndDate: undefined,
                    availableStartDate: undefined,
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
                  },
                ],
                maxYears,
              ),
            ).toBeTruthy();
          });
        });
      });
      describe('today is half maxDate', () => {
        describe('and met goal', () => {
          test('should be true', () => {
            user.metMonthlyGoal.mockReturnValueOnce(true);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 6, 1));
            expect(
              defaultHasMetGoalOrMaxTime(
                start,
                today,
                user,
                [
                  {
                    isAvailable: false,
                    sellPriceByDate: jest.fn(),
                    getEstimatedEquityFromSell: jest.fn(),
                    estimatedCashOnCashReturn: 0,
                    estimatedReturnOnCapitalGain: 0,
                    wasPurchased: true,
                    rawEstimatedAnnualCashFlow: 0,
                    getExpensesByDate: jest.fn(),
                    getEstimatedMonthlyCashFlow: jest.fn(),
                    offeredInvestmentAmounts: [],
                    propertyType: PropertyType.SingleFamily,
                    clone: jest.fn().mockReturnThis(),
                    equityCapturePercent: 0,
                    minSellYears: 0,
                    rawCashFlow: 0,
                    address: '',
                    availableEndDate: undefined,
                    availableStartDate: undefined,
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
                  },
                ],
                maxYears,
              ),
            ).toBeTruthy();
          });
        });
        describe('and not met goal', () => {
          test('should be false', () => {
            user.metMonthlyGoal.mockReturnValueOnce(false);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 6, 1));
            expect(
              defaultHasMetGoalOrMaxTime(
                start,
                today,
                user,
                [
                  {
                    isAvailable: false,
                    sellPriceByDate: jest.fn(),
                    getEstimatedEquityFromSell: jest.fn(),
                    estimatedCashOnCashReturn: 0,
                    estimatedReturnOnCapitalGain: 0,
                    wasPurchased: true,
                    rawEstimatedAnnualCashFlow: 0,
                    getExpensesByDate: jest.fn(),
                    getEstimatedMonthlyCashFlow: jest.fn(),
                    offeredInvestmentAmounts: [],
                    propertyType: PropertyType.SingleFamily,
                    clone: jest.fn().mockReturnThis(),
                    equityCapturePercent: 0,
                    minSellYears: 0,
                    rawCashFlow: 0,
                    address: '',
                    availableEndDate: undefined,
                    availableStartDate: undefined,
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
                  },
                ],
                maxYears,
              ),
            ).toBeFalsy();
          });
        });
      });
    });
  });
});
