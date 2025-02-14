[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/property-sort](../index.md) / default

# Function: default()

> **default**\<`T`\>(`propertyA`, `propertyB`, `rules`): `number`

Defined in: [properties/property-sort.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/properties/property-sort.ts#L25)

property sort based on rules order and property value

## Type Parameters

• **T** _extends_ [`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)

## Parameters

### propertyA

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

### propertyB

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

### rules

[`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<`T`\>[]

## Returns

`number`
