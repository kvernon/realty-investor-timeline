import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { ReasonToRule } from '../../src/investments/reason-to-rule';
import { getInvestmentReasonsForPurchaseTypes } from '../../src/investments/investment-reasons-decorator';
import { getCostDownUserInvestmentResults } from '../../src/calculations/get-cost-down-user-investment-results';
import { getEquityCaptureUserInvestmentResults } from '../../src/calculations/get-equity-capture-user-investment-results';
import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';

describe('investment reasons decorators unit tests', () => {
  describe('and RentalSingleFamily', () => {
    let singleFamily: RentalSingleFamily;

    beforeEach(() => {
      singleFamily = new RentalSingleFamily();
      singleFamily.purchasePrice = 150000;
      singleFamily.rawCashFlow = 150000;
      singleFamily.id = '1';
      singleFamily.address = '123 main street';
    });

    describe('and success', () => {
      test('should map data', () => {
        const expected = [
          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleAskingPrice,
            singleFamily.propertyType,
            'purchasePrice',
            [singleFamily.purchasePrice],
            PurchaseRuleTypes.MinAskingPrice
          ),

          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleOutOfPocket,
            singleFamily.propertyType,
            'costDownPrice',
            [singleFamily.costDownPrice],
            PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            getCostDownUserInvestmentResults
          ),

          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleEquityCapture,
            singleFamily.propertyType,
            'offeredInvestmentAmounts',
            singleFamily.offeredInvestmentAmounts,
            PurchaseRuleTypes.MinEstimatedCapitalGains,
            getEquityCaptureUserInvestmentResults
          ),

          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleCashOnCash,
            singleFamily.propertyType,
            'rawEstimatedAnnualCashFlow',
            [singleFamily.rawEstimatedAnnualCashFlow],
            PurchaseRuleTypes.MinEstimatedMultiAnnualCashFlow
          ),
        ];
        const investmentReasons = getInvestmentReasonsForPurchaseTypes<RentalSingleFamily>(singleFamily);
        expect(investmentReasons).toEqual(expected);
      });
    });
  });

  describe('and RentalPassiveApartment', () => {
    let apartment: RentalPassiveApartment;

    beforeEach(() => {
      apartment = new RentalPassiveApartment();
      apartment.offeredInvestmentAmounts = [25000];
      apartment.purchasePrice = 1500000;
      apartment.rawCashFlow = 15000;
      apartment.id = '1';
      apartment.address = '123 main street';
    });

    describe('and success', () => {
      test('should map data', () => {
        const expected = [
          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleOutOfPocket,
            apartment.propertyType,
            'offeredInvestmentAmounts',
            apartment.offeredInvestmentAmounts,
            PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            getCostDownUserInvestmentResults
          ),

          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleEquityCapture,
            apartment.propertyType,
            'offeredInvestmentAmounts',
            apartment.offeredInvestmentAmounts,
            PurchaseRuleTypes.MinEstimatedCapitalGains,
            getEquityCaptureUserInvestmentResults
          ),

          new ReasonToRule(
            InvestmentReasons.DoesNotMeetUserRuleCashOnCash,
            apartment.propertyType,
            'rawEstimatedAnnualCashFlow',
            [apartment.rawEstimatedAnnualCashFlow],
            PurchaseRuleTypes.MinEstimatedMultiAnnualCashFlow
          ),
        ];
        const investmentReasons = getInvestmentReasonsForPurchaseTypes<RentalPassiveApartment>(apartment);
        expect(investmentReasons).toEqual(expected);
      });
    });
  });
});
