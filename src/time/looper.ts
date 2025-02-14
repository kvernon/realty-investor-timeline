import { ITimeline } from './timeline';
import { cloneDateUtc } from '../utils/data-clone-date';
import { LedgerItem, LedgerItemType } from '../ledger';
import { updateHistoricalRentals } from './update-historical-rentals';
import { PropertyType, RentalPassiveApartment, RentalSingleFamily } from '../properties';
import propertySort from '../properties/property-sort';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { getMinCostDownByRule } from '../calculations/get-min-cost-down-by-rule';
import { ILoopRecursiveOptions } from './i-loop-recursive-options';

export type LooperType = (options: ILoopRecursiveOptions, timeline: ITimeline) => ITimeline;

export const looper: LooperType = (options: ILoopRecursiveOptions, timeline: ITimeline): ITimeline => {
  const result = timeline.clone();
  result.endDate.setUTCMonth(result.endDate.getUTCMonth() + 1);

  //step 1: get savings
  if (result.user.monthlySavedAmount > 0) {
    const salary = new LedgerItem();
    salary.amount = result.user.monthlySavedAmount;
    salary.type = LedgerItemType.Salary;
    salary.created = cloneDateUtc(timeline.endDate, (date) => date.setUTCHours(1));
    salary.note = 'saved for month';
    result.user.ledgerCollection.add(salary);
  }

  result.rentals = updateHistoricalRentals(
    RentalSingleFamily,
    options.propertyGeneratorSingleFamily,
    result.rentals,
    timeline.endDate,
    result.user.loanSettings
  );

  result.rentals = updateHistoricalRentals(
    RentalPassiveApartment,
    options.propertyGeneratorPassiveApartment,
    result.rentals,
    timeline.endDate,
    result.user.loanSettings
  );

  //step 2: get cash flow
  for (let index = 0; index < result.rentals.length; index++) {
    const pr = result.rentals[index];
    if (pr.property && pr.property.isOwned) {
      const cashFlow = new LedgerItem();
      cashFlow.amount = pr.property.getCashFlowByDate(timeline.endDate);
      cashFlow.type = LedgerItemType.CashFlow;
      cashFlow.created = cloneDateUtc(timeline.endDate, (date) => {
        date.setUTCHours(2);
        date.setUTCMinutes(index);
      });
      cashFlow.note = `for: ${pr.property.address}, id: ${pr.property.id} (${PropertyType[pr.property.propertyType]})`;

      if (cashFlow.isAmountGreaterThanZero()) {
        result.user.ledgerCollection.add(cashFlow);
      }
    }
  }

  //step 3: sell properties
  const forSaleProperties = result.rentals
    .filter((r) => r.property && r.property.canSell(timeline.endDate))
    .sort((a, b) => propertySort<HoldRuleTypes>(a.property, b.property, result.user.holdRules));

  for (let index = 0; index < forSaleProperties.length; index++) {
    const pr = forSaleProperties[index];
    pr.property.soldDate = cloneDateUtc(timeline.endDate);

    const equityFromSell = new LedgerItem();
    equityFromSell.amount = pr.property.getEquityFromSell(timeline.endDate);
    equityFromSell.type = LedgerItemType.Equity;
    equityFromSell.created = cloneDateUtc(timeline.endDate, (date) => {
      date.setUTCHours(3);
      date.setUTCMinutes(index);
    });
    equityFromSell.note = `for: ${pr.property.address}, id: ${pr.property.id} (${
      PropertyType[pr.property.propertyType]
    })`;
    result.user.ledgerCollection.add(equityFromSell);
  }

  if (
    !result.user.hasMoneyToInvest(
      timeline.endDate,
      result.rentals.map((x) => x.property).filter((x) => x.isOwned)
    )
  ) {
    return result;
  }

  //step 4: buy new properties
  const purchaseRentals = result.rentals
    .map((r) => {
      if (r.property && r.property.isAvailableByDate(timeline.endDate)) {
        const validator = r.property.canInvestByUser(
          result.user,
          timeline.endDate,
          result.rentals.map((h) => h.property)
        );

        if (!validator.canInvest) {
          r.reasons = r.reasons.concat(
            validator.results.map((reasons) => ({
              reason: reasons.message,
              date: cloneDateUtc(timeline.endDate),
            }))
          );
        }

        return validator.canInvest ? r.property : null;
      }

      return null;
    })
    .sort((a, b) => propertySort<PurchaseRuleTypes>(a, b, result.user.purchaseRules));

  for (let index = 0; index < purchaseRentals.length; index++) {
    const rentalProperty = purchaseRentals[index];

    if (rentalProperty) {
      // check cash
      const purchaseCreated = cloneDateUtc(timeline.endDate, (date) => {
        date.setUTCHours(4);
        date.setUTCMinutes(index);
      });

      const minCostDownByRule = getMinCostDownByRule(rentalProperty, result.user.purchaseRules);
      if (
        minCostDownByRule > 0 &&
        result.user.hasMoneyToInvest(
          purchaseCreated,
          result.rentals.map((x) => x.property),
          minCostDownByRule
        )
      ) {
        // buy
        const purchase = new LedgerItem();
        purchase.amount = minCostDownByRule * -1;
        purchase.type = LedgerItemType.Purchase;
        purchase.created = purchaseCreated;
        purchase.note = `for: ${rentalProperty.address}, id: ${rentalProperty.id} (${
          PropertyType[rentalProperty.propertyType]
        })`;

        if (!purchase.isAmountGreaterThanZero()) {
          result.user.ledgerCollection.add(purchase);

          // set to purchase
          rentalProperty.purchaseDate = cloneDateUtc(timeline.endDate);

          if (rentalProperty.propertyType === PropertyType.PassiveApartment) {
            rentalProperty.costDownPrice = minCostDownByRule;
          }
        }
      }
    }
  }

  return result;
};
