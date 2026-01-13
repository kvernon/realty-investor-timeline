[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [rules/rule-evaluation](../index.md) / IRuleEvaluation

# Interface: IRuleEvaluation\<E\>

Defined in: [rules/rule-evaluation.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/rules/rule-evaluation.ts#L7)

## Extends

- [`IRule`](../../i-rule/interfaces/IRule.md)\<`E`\>

## Type Parameters

• **E** _extends_ [`PurchaseRuleTypes`](../../purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../hold-rule-types/enumerations/HoldRuleTypes.md)

## Properties

### propertyType

> **propertyType**: [`PropertyType`](../../../properties/property-type/enumerations/PropertyType.md)

Defined in: [rules/i-rule.ts:6](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/rules/i-rule.ts#L6)

#### Inherited from

[`IRule`](../../i-rule/interfaces/IRule.md).[`propertyType`](../../i-rule/interfaces/IRule.md#propertytype)

---

### type

> **type**: `E`

Defined in: [rules/i-rule.ts:4](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/rules/i-rule.ts#L4)

#### Inherited from

[`IRule`](../../i-rule/interfaces/IRule.md).[`type`](../../i-rule/interfaces/IRule.md#type)

---

### value

> **value**: `number`

Defined in: [rules/i-rule.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/rules/i-rule.ts#L5)

#### Inherited from

[`IRule`](../../i-rule/interfaces/IRule.md).[`value`](../../i-rule/interfaces/IRule.md#value)

## Methods

### evaluate()

> **evaluate**(`dataValue`): `boolean`

Defined in: [rules/rule-evaluation.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/rules/rule-evaluation.ts#L12)

Determines if the [dataValue](IRuleEvaluation.md#datavalue) passes the rule

#### Parameters

##### dataValue

`number`

#### Returns

`boolean`
