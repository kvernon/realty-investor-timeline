import { IUser } from '../../src/account/user';
import { defaultHasMetGoalOrMaxTime } from '../../src/time/default-has-met-goal-or-max-time';

describe('defaultHasMetGoalOrMaxTime unit tests', () => {
  describe('and dates same', () => {
    describe('and user null', () => {
      test('should be false', () => {
        const startAndEnd = new Date();
        expect(defaultHasMetGoalOrMaxTime(startAndEnd, startAndEnd, null, 1)).toBeFalsy();
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
          expect(defaultHasMetGoalOrMaxTime(start, today, null, maxYears)).toBeTruthy();
        });
      });
      describe('today is half maxDate', () => {
        test('should be false', () => {
          const start = new Date();
          const maxYears = 1;
          const today = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 6, 1));
          expect(defaultHasMetGoalOrMaxTime(start, today, null, maxYears)).toBeFalsy();
        });
      });
    });
    describe('and user populated', () => {
      let user: jest.Mocked<IUser>;

      beforeEach(() => {
        user = {
          ledgerCollection: null,
          getCashFlowMonth: jest.fn(),
          getBalance: jest.fn(),
          metMonthlyGoal: jest.fn(),
          monthlyIncomeAmountGoal: 20,
          hasMoneyToInvest: jest.fn(),
          hasMinimumSavings: jest.fn(),
          getMinimumSavings: jest.fn(),
          addLedgerItem: jest.fn(),
          loanSettings: [],
          monthlySavedAmount: 0,
          holdRules: [],
          purchaseRules: [],
          clone: jest.fn(),
          getSummaryAnnual: jest.fn(),
          getSummaryMonth: jest.fn(),
          getSummariesAnnual: jest.fn(),
        } as jest.Mocked<IUser>;
      });
      describe('today is maxDate', () => {
        describe('and met goal', () => {
          test('should be true', () => {
            user.metMonthlyGoal.mockReturnValueOnce(true);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear() + maxYears, start.getUTCMonth(), 1));
            expect(defaultHasMetGoalOrMaxTime(start, today, user, maxYears)).toBeTruthy();
          });
        });
        describe('and not met goal', () => {
          test('should be truthy', () => {
            user.metMonthlyGoal.mockReturnValueOnce(false);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear() + maxYears, start.getUTCMonth(), 1));
            expect(defaultHasMetGoalOrMaxTime(start, today, user, maxYears)).toBeTruthy();
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
            expect(defaultHasMetGoalOrMaxTime(start, today, user, maxYears)).toBeTruthy();
          });
        });
        describe('and not met goal', () => {
          test('should be false', () => {
            user.metMonthlyGoal.mockReturnValueOnce(false);
            const start = new Date();
            const maxYears = 1;
            const today = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 6, 1));
            expect(defaultHasMetGoalOrMaxTime(start, today, user, maxYears)).toBeFalsy();
          });
        });
      });
    });
  });
});
