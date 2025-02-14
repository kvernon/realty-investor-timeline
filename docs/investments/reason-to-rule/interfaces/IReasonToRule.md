[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [investments/reason-to-rule](../index.md) / IReasonToRule

# Interface: IReasonToRule\<T, TR\>

Defined in: [investments/reason-to-rule.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L15)

## Extends

- [`IReasonToRuleMeta`](IReasonToRuleMeta.md)\<`TR`\>

## Type Parameters

• **T** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

• **TR** _extends_ [`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)

## Properties

### investmentReason

> **investmentReason**: [`InvestmentReasons`](../../investment-reasons/enumerations/InvestmentReasons.md)

Defined in: [investments/reason-to-rule.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L11)

#### Inherited from

[`IReasonToRuleMeta`](IReasonToRuleMeta.md).[`investmentReason`](IReasonToRuleMeta.md#investmentreason)

---

### isRuleAndPropertyTypeMatch()

> **isRuleAndPropertyTypeMatch**: (`propertyType`, `ruleType`) => `boolean`

Defined in: [investments/reason-to-rule.ts:21](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L21)

#### Parameters

##### propertyType

[`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

##### ruleType

`TR`

#### Returns

`boolean`

---

### isRuleMatch()

> **isRuleMatch**: (`ruleType`) => `boolean`

Defined in: [investments/reason-to-rule.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L23)

#### Parameters

##### ruleType

`TR`

#### Returns

`boolean`

---

### propertyKey

> **propertyKey**: keyof `T` & `string`

Defined in: [investments/reason-to-rule.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L18)

---

### propertyType

> **propertyType**: [`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

Defined in: [investments/reason-to-rule.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L17)

---

### ruleType?

> `optional` **ruleType**: `TR`

Defined in: [investments/reason-to-rule.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L12)

#### Inherited from

[`IReasonToRuleMeta`](IReasonToRuleMeta.md).[`ruleType`](IReasonToRuleMeta.md#ruletype)

---

### values

> **values**: `number`[]

Defined in: [investments/reason-to-rule.ts:19](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L19)

## Methods

### getValueAtIndex()

> **getValueAtIndex**(`index`): `number`

Defined in: [investments/reason-to-rule.ts:27](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L27)

#### Parameters

##### index

`number`

#### Returns

`number`

---

### isRuleNone()

> **isRuleNone**(): `boolean`

Defined in: [investments/reason-to-rule.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L25)

#### Returns

`boolean`

---

### isValueGreater()

> **isValueGreater**\<`T2`\>(`rule`): `boolean`

Defined in: [investments/reason-to-rule.ts:29](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L29)

#### Type Parameters

• **T2** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

#### Parameters

##### rule

[`IReasonToRule`](IReasonToRule.md)\<`T2`, `TR`\>

#### Returns

`boolean`

---

### userResultEstimates()

> **userResultEstimates**(`rental`, `holdRules`, `purchaseRules`, `date`): [`UserInvestResult`](../../user-invest-result/classes/UserInvestResult.md)[]

Defined in: [investments/reason-to-rule.ts:31](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/investments/reason-to-rule.ts#L31)

#### Parameters

##### rental

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

##### holdRules

[`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

##### purchaseRules

[`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

##### date

`Date`

#### Returns

[`UserInvestResult`](../../user-invest-result/classes/UserInvestResult.md)[]
