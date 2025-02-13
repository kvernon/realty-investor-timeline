[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [rules/get-rules](../index.md) / getRules

# Function: getRules()

> **getRules**\<`E`\>(`goals`): [`IRuleEvaluation`](../../rule-evaluation/interfaces/IRuleEvaluation.md)\<`E`\>[]

Defined in: [rules/get-rules.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/rules/get-rules.ts#L10)

provides a way to translate the [IRule](../../i-rule/interfaces/IRule.md) into a [RuleEvaluation](../../rule-evaluation/classes/RuleEvaluation.md) instance

## Type Parameters

• **E** _extends_ [`PurchaseRuleTypes`](../../purchase-rule-types/enumerations/PurchaseRuleTypes.md) \| [`HoldRuleTypes`](../../hold-rule-types/enumerations/HoldRuleTypes.md)

## Parameters

### goals

[`IRule`](../../i-rule/interfaces/IRule.md)\<`E`\>[]

## Returns

[`IRuleEvaluation`](../../rule-evaluation/interfaces/IRuleEvaluation.md)\<`E`\>[]
