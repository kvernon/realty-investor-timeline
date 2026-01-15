[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [account/i-user-goal](../index.md) / IUserGoal

# Interface: IUserGoal

Defined in: [account/i-user-goal.ts:1](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/account/i-user-goal.ts#L1)

## Extended by

- [`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md)

## Properties

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [account/i-user-goal.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/account/i-user-goal.ts#L5)

used to determine how much you need want for monthly expenses

## Methods

### metAverageQuarterlyGoal()

> **metAverageQuarterlyGoal**(`today`): `boolean`

Defined in: [account/i-user-goal.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/account/i-user-goal.ts#L17)

takes data from a quarterly average cash flow and compares it to the monthly goal. The reason on quarterly is that apartments do distributions quarterly, so you have to spread those out monthly

#### Parameters

##### today

`Date`

#### Returns

`boolean`

---

### metMonthlyGoal()

> **metMonthlyGoal**(`today`): `boolean`

Defined in: [account/i-user-goal.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/account/i-user-goal.ts#L11)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

#### Returns

`boolean`
