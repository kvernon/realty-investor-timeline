import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { UserInvestResult } from '../../src/investments/user-invest-result';

describe('UserInvestResult unit tests', () => {
  let instance: UserInvestResult;

  afterEach(() => {
    instance = null;
  });

  describe('and ctor', () => {
    test('should create with more', () => {
      instance = new UserInvestResult(InvestmentReasons.PropertyIsAlreadyOwned, 'some message', [{ name: 'name', value: 1 }]);
      expect(instance.investmentReason).toEqual(InvestmentReasons.PropertyIsAlreadyOwned);
      expect(instance.message).toEqual('PropertyIsAlreadyOwned some message');
    });
  });
});
