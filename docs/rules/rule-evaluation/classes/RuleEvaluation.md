[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [rules/rule-evaluation](../index.md) / RuleEvaluation

# Class: RuleEvaluation\<E\>

Defined in: [rules/rule-evaluation.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/rules/rule-evaluation.ts#L15)

## Type Parameters

• **E** _extends_ [`PurchaseRuleTypes`](../../purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../hold-rule-types/enumerations/HoldRuleTypes.md)

## Implements

- [`IRuleEvaluation`](../interfaces/IRuleEvaluation.md)\<`E`\>

## Constructors

### new RuleEvaluation()

> **new RuleEvaluation**\<`E`\>(`value`, `type`, `propertyType`): [`RuleEvaluation`](RuleEvaluation.md)\<`E`\>

Defined in: [rules/rule-evaluation.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/rules/rule-evaluation.ts#L16)

#### Parameters

##### value

`number`

##### type

`E`

##### propertyType

[`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

#### Returns

[`RuleEvaluation`](RuleEvaluation.md)\<`E`\>

## Properties

### propertyType

> **propertyType**: [`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

Defined in: [rules/rule-evaluation.ts:24](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/rules/rule-evaluation.ts#L24)

#### Implementation of

[`IRuleEvaluation`](../interfaces/IRuleEvaluation.md).[`propertyType`](../interfaces/IRuleEvaluation.md#propertytype)

---

### type

> **type**: `E`

Defined in: [rules/rule-evaluation.ts:22](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/rules/rule-evaluation.ts#L22)

#### Implementation of

[`IRuleEvaluation`](../interfaces/IRuleEvaluation.md).[`type`](../interfaces/IRuleEvaluation.md#type)

---

### value

> **value**: `number`

Defined in: [rules/rule-evaluation.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/rules/rule-evaluation.ts#L23)

#### Implementation of

[`IRuleEvaluation`](../interfaces/IRuleEvaluation.md).[`value`](../interfaces/IRuleEvaluation.md#value)

## Methods

### evaluate()

> **evaluate**(`dataValue`): `boolean`

Defined in: [rules/rule-evaluation.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/rules/rule-evaluation.ts#L30)

Determines if the [dataValue](RuleEvaluation.md#datavalue) passes the rule

#### Parameters

##### dataValue

`number`

#### Returns

`boolean`

#### Implementation of

[`IRuleEvaluation`](../interfaces/IRuleEvaluation.md).[`evaluate`](../interfaces/IRuleEvaluation.md#evaluate)
