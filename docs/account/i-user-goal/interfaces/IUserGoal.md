[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [account/i-user-goal](../index.md) / IUserGoal

# Interface: IUserGoal

Defined in: [account/i-user-goal.ts:3](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-goal.ts#L3)

## Extended by

- [`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md)

## Properties

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [account/i-user-goal.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-goal.ts#L7)

used to determine how much you need want for monthly expenses

## Methods

### metMonthlyGoal()

> **metMonthlyGoal**(`today`, `properties`): `boolean`

Defined in: [account/i-user-goal.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-goal.ts#L13)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`boolean`
