[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [calculations/get-equity-capture-user-investment-results](../index.md) / getEquityCaptureUserInvestmentResults

# Function: getEquityCaptureUserInvestmentResults()

> **getEquityCaptureUserInvestmentResults**(`rental`, `holdRules`, `purchaseRules`, `date`): [`UserInvestResult`](../../../investments/user-invest-result/classes/UserInvestResult.md)[]

Defined in: [calculations/get-equity-capture-user-investment-results.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/calculations/get-equity-capture-user-investment-results.ts#L12)

## Parameters

### rental

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

### holdRules

[`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

### purchaseRules

[`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

### date

`Date`

## Returns

[`UserInvestResult`](../../../investments/user-invest-result/classes/UserInvestResult.md)[]
