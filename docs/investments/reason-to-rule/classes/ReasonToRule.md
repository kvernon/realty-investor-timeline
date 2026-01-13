[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [investments/reason-to-rule](../index.md) / ReasonToRule

# Class: ReasonToRule\<T, TR\>

Defined in: [investments/reason-to-rule.ts:38](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L38)

## Type Parameters

• **T** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

• **TR** _extends_ [`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)

## Implements

- [`IReasonToRule`](../interfaces/IReasonToRule.md)\<`T`, `TR`\>

## Constructors

### new ReasonToRule()

> **new ReasonToRule**\<`T`, `TR`\>(`investmentReason`, `propertyType`, `propertyKey`, `value`, `ruleType`?, `overrideUserResultEstimates`?): [`ReasonToRule`](ReasonToRule.md)\<`T`, `TR`\>

Defined in: [investments/reason-to-rule.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L41)

#### Parameters

##### investmentReason

[`InvestmentReasons`](../../investment-reasons/enumerations/InvestmentReasons.md)

##### propertyType

[`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

##### propertyKey

keyof `T` & `string`

##### value

`number`[]

##### ruleType?

`TR`

##### overrideUserResultEstimates?

[`UserResultEstimates`](../../user-result-estimates/type-aliases/UserResultEstimates.md)

#### Returns

[`ReasonToRule`](ReasonToRule.md)\<`T`, `TR`\>

## Properties

### investmentReason

> **investmentReason**: [`InvestmentReasons`](../../investment-reasons/enumerations/InvestmentReasons.md)

Defined in: [investments/reason-to-rule.ts:81](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L81)

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`investmentReason`](../interfaces/IReasonToRule.md#investmentreason)

---

### propertyKey

> **propertyKey**: keyof `T` & `string`

Defined in: [investments/reason-to-rule.ts:129](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L129)

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`propertyKey`](../interfaces/IReasonToRule.md#propertykey)

---

### propertyType

> **propertyType**: [`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

Defined in: [investments/reason-to-rule.ts:130](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L130)

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`propertyType`](../interfaces/IReasonToRule.md#propertytype-2)

---

### ruleType

> **ruleType**: `TR`

Defined in: [investments/reason-to-rule.ts:131](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L131)

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`ruleType`](../interfaces/IReasonToRule.md#ruletype-4)

---

### values

> **values**: `number`[]

Defined in: [investments/reason-to-rule.ts:132](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L132)

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`values`](../interfaces/IReasonToRule.md#values)

## Methods

### getValueAtIndex()

> **getValueAtIndex**(`index`): `number`

Defined in: [investments/reason-to-rule.ts:95](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L95)

#### Parameters

##### index

`number`

#### Returns

`number`

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`getValueAtIndex`](../interfaces/IReasonToRule.md#getvalueatindex)

---

### isRuleAndPropertyTypeMatch()

> **isRuleAndPropertyTypeMatch**(`propertyType`, `ruleType`): `boolean`

Defined in: [investments/reason-to-rule.ts:83](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L83)

#### Parameters

##### propertyType

[`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

##### ruleType

`TR`

#### Returns

`boolean`

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`isRuleAndPropertyTypeMatch`](../interfaces/IReasonToRule.md#isruleandpropertytypematch)

---

### isRuleMatch()

> **isRuleMatch**(`ruleType`): `boolean`

Defined in: [investments/reason-to-rule.ts:87](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L87)

#### Parameters

##### ruleType

`TR`

#### Returns

`boolean`

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`isRuleMatch`](../interfaces/IReasonToRule.md#isrulematch)

---

### isRuleNone()

> **isRuleNone**(): `boolean`

Defined in: [investments/reason-to-rule.ts:91](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L91)

#### Returns

`boolean`

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`isRuleNone`](../interfaces/IReasonToRule.md#isrulenone)

---

### isValueGreater()

> **isValueGreater**\<`T2`\>(`rule`): `boolean`

Defined in: [investments/reason-to-rule.ts:57](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L57)

#### Type Parameters

• **T2** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

#### Parameters

##### rule

[`IReasonToRule`](../interfaces/IReasonToRule.md)\<`T2`, `TR`\>

#### Returns

`boolean`

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`isValueGreater`](../interfaces/IReasonToRule.md#isvaluegreater)

---

### userResultEstimates()

> **userResultEstimates**(`rental`, `holdRules`, `purchaseRules`, `date`): [`UserInvestResult`](../../user-invest-result/classes/UserInvestResult.md)[]

Defined in: [investments/reason-to-rule.ts:103](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/investments/reason-to-rule.ts#L103)

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

#### Implementation of

[`IReasonToRule`](../interfaces/IReasonToRule.md).[`userResultEstimates`](../interfaces/IReasonToRule.md#userresultestimates)
