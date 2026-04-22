[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/property-sort](../index.md) / default

# Function: default()

> **default**\<`T`\>(`propertyA`, `propertyB`, `rules`): `number`

Defined in: [properties/property-sort.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/properties/property-sort.ts#L25)

property sort based on rules order and property value

## Type Parameters

### T

`T` _extends_ [`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)

## Parameters

### propertyA

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

### propertyB

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

### rules

[`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<`T`\>[]

## Returns

`number`
