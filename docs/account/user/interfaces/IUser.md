[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [account/user](../index.md) / IUser

# Interface: IUser

Defined in: [account/user.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/user.ts#L16)

It's the user... as an interface!

## Extends

- [`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md)

## Properties

### holdRules

> **holdRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`HoldRuleTypes`](../../../rules/hold-rule-types/enumerations/HoldRuleTypes.md)\>[]

Defined in: [account/i-user-investor-check.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L23)

a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`holdRules`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#holdrules)

---

### ledgerCollection

> `readonly` **ledgerCollection**: [`ILedgerCollection`](../../../ledger/ledger-collection/interfaces/ILedgerCollection.md)

Defined in: [account/i-user-investor-check.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L13)

the collection which is used to keep a balance sheet.

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`ledgerCollection`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#ledgercollection)

---

### loanSettings

> **loanSettings**: [`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

Defined in: [account/i-user-investor-check.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L18)

a collection of loan settings for how to get a loan for single family or some other kind of property

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`loanSettings`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#loansettings)

---

### monthlyIncomeAmountGoal

> **monthlyIncomeAmountGoal**: `number`

Defined in: [account/i-user-goal.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-goal.ts#L5)

used to determine how much you need want for monthly expenses

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`monthlyIncomeAmountGoal`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#monthlyincomeamountgoal)

---

### monthlySavedAmount

> **monthlySavedAmount**: `number`

Defined in: [account/user.ts:20](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/user.ts#L20)

an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings

---

### purchaseRules

> **purchaseRules**: [`IRuleEvaluation`](../../../rules/rule-evaluation/interfaces/IRuleEvaluation.md)\<[`PurchaseRuleTypes`](../../../rules/purchase-rule-types/enumerations/PurchaseRuleTypes.md)\>[]

Defined in: [account/i-user-investor-check.ts:60](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L60)

a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`purchaseRules`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#purchaserules)

## Methods

### clone()

> **clone**(): [`IUser`](IUser.md)

Defined in: [account/user.ts:34](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/user.ts#L34)

#### Returns

[`IUser`](IUser.md)

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`): `number`

Defined in: [account/i-user-investor-check.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L55)

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

### getCashFlowMonth()

> **getCashFlowMonth**(`today`): `number`

Defined in: [account/user.ts:26](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/user.ts#L26)

returns your passive income for the year + month date supplied

#### Parameters

##### today

`Date`

#### Returns

`number`

---

### getCashFlowQuarter()

> **getCashFlowQuarter**(`today`): `number`

Defined in: [account/user.ts:32](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/user.ts#L32)

returns the cash flow by a quarter. This is ideal when evaluating your distributions that are not monthly.

#### Parameters

##### today

`Date`

#### Returns

`number`

---

### getMinimumSavings()

> **getMinimumSavings**(`date`, `properties`): `number`

Defined in: [account/i-user-investor-check.ts:48](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L48)

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

Defined in: [account/i-user-investor-check.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L41)

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

Defined in: [account/i-user-investor-check.ts:33](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-investor-check.ts#L33)

based upon [getMinimumSavings](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#getminimumsavings), it checks to see if there is an amount remaining that can be used along with the [contribution](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#contribution).

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

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`hasMoneyToInvest`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#hasmoneytoinvest)

---

### metAverageQuarterlyGoal()

> **metAverageQuarterlyGoal**(`today`): `boolean`

Defined in: [account/i-user-goal.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-goal.ts#L17)

takes data from a quarterly average cash flow and compares it to the monthly goal. The reason on quarterly is that apartments do distributions quarterly, so you have to spread those out monthly

#### Parameters

##### today

`Date`

#### Returns

`boolean`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`metAverageQuarterlyGoal`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#metaveragequarterlygoal)

---

### metMonthlyGoal()

> **metMonthlyGoal**(`today`): `boolean`

Defined in: [account/i-user-goal.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/account/i-user-goal.ts#L11)

method used to help determine if you have met your expenses

#### Parameters

##### today

`Date`

#### Returns

`boolean`

#### Inherited from

[`IUserInvestorCheck`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md).[`metMonthlyGoal`](../../i-user-investor-check/interfaces/IUserInvestorCheck.md#metmonthlygoal)
