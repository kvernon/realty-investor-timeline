import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { UserInvestResult } from '../../src/investments/user-invest-result';

describe('UserInvestResult unit tests', () => {
  let instance: UserInvestResult;

  afterEach(() => {
    instance = null;
  });

  describe('and ctor', () => {
    test('should create', () => {
      instance = new UserInvestResult(true);
      expect(instance.investmentReason).toEqual(InvestmentReasons.Unknown);
      expect(instance.canInvest).toEqual(true);
      expect(instance.message).toEqual('Unknown');
    });

    test('should create with more', () => {
      instance = new UserInvestResult(false, InvestmentReasons.PropertyIsAlreadyOwned, 'some message');
      expect(instance.investmentReason).toEqual(InvestmentReasons.PropertyIsAlreadyOwned);
      expect(instance.canInvest).toEqual(false);
      expect(instance.message).toEqual('PropertyIsAlreadyOwned some message');
    });
  });
});
