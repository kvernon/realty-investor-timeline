[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [account/user](../index.md) / User

# Class: User

Defined in: [account/user.ts:32](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L32)

It's the user... as an interface!

## Implements

- [`IUser`](../interfaces/IUser.md)

## Constructors

### new User()

> **new User**(`ledgerCollection`): [`User`](User.md)

Defined in: [account/user.ts:75](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L75)

#### Parameters

##### ledgerCollection

[`ILedgerCollection`](../../../ledger/ledger-collection/interfaces/ILedgerCollection.md)

#### Returns

[`User`](User.md)

## Properties

### holdRules

> **holdRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

Defined in: [account/user.ts:82](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L82)

a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`holdRules`](../interfaces/IUser.md#holdrules)

---

### ledgerCollection

> `readonly` **ledgerCollection**: [`ILedgerCollection`](../../../ledger/ledger-collection/interfaces/ILedgerCollection.md)

Defined in: [account/user.ts:36](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L36)

the collection which is used to keep a balance sheet.

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`ledgerCollection`](../interfaces/IUser.md#ledgercollection)

---

### loanSettings

> **loanSettings**: [`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

Defined in: [account/user.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L41)

a collection of loan settings for how to get a loan for single family or some other kind of property

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`loanSettings`](../interfaces/IUser.md#loansettings)

---

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [account/user.ts:46](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L46)

used to determine how much you need want for monthly expenses

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`monthlyIncomeAmountGoal`](../interfaces/IUser.md#monthlyincomeamountgoal)

---

### monthlySavedAmount

> **monthlySavedAmount**: `number`

Defined in: [account/user.ts:73](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L73)

an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`monthlySavedAmount`](../interfaces/IUser.md#monthlysavedamount)

---

### purchaseRules

> **purchaseRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

Defined in: [account/user.ts:87](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L87)

a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`purchaseRules`](../interfaces/IUser.md#purchaserules)

## Methods

### clone()

> **clone**(): [`IUser`](../interfaces/IUser.md)

Defined in: [account/user.ts:171](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L171)

#### Returns

[`IUser`](../interfaces/IUser.md)

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`clone`](../interfaces/IUser.md#clone)

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`): `number`

Defined in: [account/user.ts:155](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L155)

should be the total balance - savings, using [getMinimumSavings](User.md#getminimumsavings), for determining monthly cash to save for single family properties

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`getAvailableSavings`](../interfaces/IUser.md#getavailablesavings)

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(`today`, `properties`): `number`

Defined in: [account/user.ts:57](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L57)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`getEstimatedMonthlyCashFlow`](../interfaces/IUser.md#getestimatedmonthlycashflow)

---

### getMinimumSavings()

> **getMinimumSavings**(`date`, `properties`): `number`

Defined in: [account/user.ts:137](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L137)

used to retrieve the amount required to keep in savings

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`number`

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`getMinimumSavings`](../interfaces/IUser.md#getminimumsavings)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`date`, `properties`): `boolean`

Defined in: [account/user.ts:119](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L119)

a way to determine if the user has enough money. This is different because with
single family homes, you would have to save a certain amount of monthly mortgage

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`boolean`

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`hasMinimumSavings`](../interfaces/IUser.md#hasminimumsavings)

---

### hasMoneyToInvest()

> **hasMoneyToInvest**(`date`, `properties`, `contribution`?): `boolean`

Defined in: [account/user.ts:97](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L97)

based upon [getMinimumSavings](User.md#getminimumsavings), it checks to see if there is an amount remaining that can be used along with the [contribution](User.md#contribution).

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

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`hasMoneyToInvest`](../interfaces/IUser.md#hasmoneytoinvest)

---

### metMonthlyGoal()

> **metMonthlyGoal**(`today`, `properties`): `boolean`

Defined in: [account/user.ts:53](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/account/user.ts#L53)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

`boolean`

#### Implementation of

[`IUser`](../interfaces/IUser.md).[`metMonthlyGoal`](../interfaces/IUser.md#metmonthlygoal)
