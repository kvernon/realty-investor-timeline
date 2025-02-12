[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [account/user](../index.md) / IUser

# Interface: IUser

Defined in: [account/user.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/user.ts#L16)

It's the user... as an interface!

## Extends

- [`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md)

## Properties

### holdRules

> **holdRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

Defined in: [account/i-user-investor-check.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L23)

a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`holdRules`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#holdrules)

---

### ledgerCollection

> `readonly` **ledgerCollection**: [`ILedgerCollection`](../../../ledger/ledger-collection/interfaces/ILedgerCollection.md)

Defined in: [account/i-user-investor-check.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L13)

the collection which is used to keep a balance sheet.

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`ledgerCollection`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#ledgercollection)

---

### loanSettings

> **loanSettings**: [`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

Defined in: [account/i-user-investor-check.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L18)

a collection of loan settings for how to get a loan for single family or some other kind of property

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`loanSettings`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#loansettings)

---

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [account/i-user-goal.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-goal.ts#L7)

used to determine how much you need want for monthly expenses

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`monthlyIncomeAmountGoal`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#monthlyincomeamountgoal)

---

### monthlySavedAmount

> **monthlySavedAmount**: `number`

Defined in: [account/user.ts:20](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/user.ts#L20)

an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings

---

### purchaseRules

> **purchaseRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

Defined in: [account/i-user-investor-check.ts:58](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L58)

a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`purchaseRules`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#purchaserules)

## Methods

### clone()

> **clone**(): [`IUser`](IUser.md)

Defined in: [account/user.ts:29](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/user.ts#L29)

#### Returns

[`IUser`](IUser.md)

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`): `number`

Defined in: [account/i-user-investor-check.ts:53](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L53)

should be the total balance - savings, using [getMinimumSavings](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#getminimumsavings), for determining monthly cash to save for single family properties

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`getAvailableSavings`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#getavailablesavings)

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(`today`, `properties`): `number`

Defined in: [account/user.ts:27](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/user.ts#L27)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

---

### getMinimumSavings()

> **getMinimumSavings**(`date`, `properties`): `number`

Defined in: [account/i-user-investor-check.ts:46](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L46)

used to retrieve the amount required to keep in savings

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`getMinimumSavings`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#getminimumsavings)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`date`, `properties`): `boolean`

Defined in: [account/i-user-investor-check.ts:39](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L39)

a way to determine if the user has enough money. This is different because with
single family homes, you would have to save a certain amount of monthly mortgage

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`boolean`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`hasMinimumSavings`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#hasminimumsavings)

---

### hasMoneyToInvest()

> **hasMoneyToInvest**(`date`, `properties`, `contribution`?): `boolean`

Defined in: [account/i-user-investor-check.ts:31](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-investor-check.ts#L31)

based upon [getMinimumSavings](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#getminimumsavings), it checks to see if there is an amount remaining that can be used.

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### contribution?

`number`

#### Returns

`boolean`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`hasMoneyToInvest`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#hasmoneytoinvest)

---

### metMonthlyGoal()

> **metMonthlyGoal**(`today`, `properties`): `boolean`

Defined in: [account/i-user-goal.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/account/i-user-goal.ts#L13)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`boolean`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`metMonthlyGoal`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#metmonthlygoal)
