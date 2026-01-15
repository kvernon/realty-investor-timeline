[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/simulate](../index.md) / ISimulateOptions

# Interface: ISimulateOptions

Defined in: [time/simulate.ts:32](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L32)

## Properties

### amountInSavings

> **amountInSavings**: `number`

Defined in: [time/simulate.ts:36](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L36)

this is what you have saved up currently to invest in

---

### generatorOptionsPassiveApartment?

> `optional` **generatorOptionsPassiveApartment**: [`IGenOptions`](IGenOptions.md)

Defined in: [time/simulate.ts:80](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L80)

---

### generatorOptionsSingleFamily?

> `optional` **generatorOptionsSingleFamily**: [`IGenOptions`](IGenOptions.md)

Defined in: [time/simulate.ts:78](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L78)

---

### hasMetGoalOrMaxTime?

> `optional` **hasMetGoalOrMaxTime**: [`HasMetGoalOrMaxTime`](../../has-met-goal-or-max-time/type-aliases/HasMetGoalOrMaxTime.md)

Defined in: [time/simulate.ts:76](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L76)

This is how the system knows when to quit. If no value is supplied, it will use `defaultHasMetGoalOrMaxTime`.

---

### holdRules

> **holdRules**: [`IRule`](../../../rules/i-rule/interfaces/IRule.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

Defined in: [time/simulate.ts:56](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L56)

a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule

---

### loanSettings

> **loanSettings**: [`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

Defined in: [time/simulate.ts:51](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L51)

loan basics about you. For example, if you have a great credit, you'll probably have a low interest rate. so that's 3%. With rentals, you are 1% higher, so make it 4%.

---

### maxYears?

> `optional` **maxYears**: `number`

Defined in: [time/simulate.ts:71](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L71)

how long should this run in years? A common number is 25 to 30 years before giving up.

---

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [time/simulate.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L41)

What you want to get to for cash flow. This has been monthly expenses for many.

---

### monthlySavedAmount

> **monthlySavedAmount**: `number`

Defined in: [time/simulate.ts:46](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L46)

After your paycheck you would take your excess and save it. Here is that amount.

---

### purchaseRules

> **purchaseRules**: [`IRule`](../../../rules/i-rule/interfaces/IRule.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

Defined in: [time/simulate.ts:61](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L61)

This is how to prioritize the properties that come up. Use one, or use all rules! The order you put them in here, is the order it evaluates them as. [PurchaseRuleTypes](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md) for possible rules

---

### startDate?

> `optional` **startDate**: `Date`

Defined in: [time/simulate.ts:66](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/time/simulate.ts#L66)

when does this start?
