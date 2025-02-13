[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [account/i-user-investor-check](../index.md) / IUserInvestorCheck

# Interface: IUserInvestorCheck

Defined in: [account/i-user-investor-check.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L9)

## Extends

- [`IUserGoal`](../../i-user-goal/interfaces/IUserGoal.md)

## Extended by

- [`IUser`](../../user/interfaces/IUser.md)

## Properties

### holdRules

> **holdRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

Defined in: [account/i-user-investor-check.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L23)

a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule

---

### ledgerCollection

> `readonly` **ledgerCollection**: [`ILedgerCollection`](../../../ledger/ledger-collection/interfaces/ILedgerCollection.md)

Defined in: [account/i-user-investor-check.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L13)

the collection which is used to keep a balance sheet.

---

### loanSettings

> **loanSettings**: [`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

Defined in: [account/i-user-investor-check.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L18)

a collection of loan settings for how to get a loan for single family or some other kind of property

---

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [account/i-user-goal.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-goal.ts#L7)

used to determine how much you need want for monthly expenses

#### Inherited from

[`IUserGoal`](../../i-user-goal/interfaces/IUserGoal.md).[`monthlyIncomeAmountGoal`](../../i-user-goal/interfaces/IUserGoal.md#monthlyincomeamountgoal)

---

### purchaseRules

> **purchaseRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

Defined in: [account/i-user-investor-check.ts:60](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L60)

a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule

## Methods

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`): `number`

Defined in: [account/i-user-investor-check.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L55)

should be the total balance - savings, using [getMinimumSavings](IUserInvestorCheck.md#getminimumsavings), for determining monthly cash to save for single family properties

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

---

### getMinimumSavings()

> **getMinimumSavings**(`date`, `properties`): `number`

Defined in: [account/i-user-investor-check.ts:48](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L48)

used to retrieve the amount required to keep in savings

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

---

### hasMinimumSavings()

> **hasMinimumSavings**(`date`, `properties`): `boolean`

Defined in: [account/i-user-investor-check.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L41)

a way to determine if the user has enough money. This is different because with
single family homes, you would have to save a certain amount of monthly mortgage

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`boolean`

---

### hasMoneyToInvest()

> **hasMoneyToInvest**(`date`, `properties`, `contribution`?): `boolean`

Defined in: [account/i-user-investor-check.ts:33](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/account/i-user-investor-check.ts#L33)

based upon [getMinimumSavings](IUserInvestorCheck.md#getminimumsavings), it checks to see if there is an amount remaining that can be used along with the [contribution](IUserInvestorCheck.md#contribution).

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### contribution?

`number`

#### Returns

`boolean`

#### Example

```ts
availableSavings - contribution >= 0;
```

---

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

#### Inherited from

[`IUserGoal`](../../i-user-goal/interfaces/IUserGoal.md).[`metMonthlyGoal`](../../i-user-goal/interfaces/IUserGoal.md#metmonthlygoal)
