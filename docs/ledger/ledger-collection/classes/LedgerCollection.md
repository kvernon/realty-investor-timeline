[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:87](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L87)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### new LedgerCollection()

> **new LedgerCollection**(): [`LedgerCollection`](LedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:98](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L98)

#### Returns

[`LedgerCollection`](LedgerCollection.md)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:128](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L128)

#### Parameters

##### item

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md) | `Iterable`\<[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)\>

#### Returns

`void`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`add`](../interfaces/ILedgerCollection.md#add)

---

### clone()

> **clone**(): [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:420](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L420)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:102](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L102)

#### Parameters

##### pred?

[`LedgerItemPredicate`](../type-aliases/LedgerItemPredicate.md)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`filter`](../interfaces/ILedgerCollection.md#filter)

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`, `minMonthsRequired`): `number`

Defined in: [ledger/ledger-collection.ts:398](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L398)

should be the total balance - savings for single family

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### minMonthsRequired

`number` = `6`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getAvailableSavings`](../interfaces/ILedgerCollection.md#getavailablesavings)

---

### getAverageByType()

> **getAverageByType**(`collection`, `type`): `number`

Defined in: [ledger/ledger-collection.ts:179](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L179)

#### Parameters

##### collection

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

##### type

[`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

#### Returns

`number`

---

### getAverageCashFlowMonthByQuarter()

> **getAverageCashFlowMonthByQuarter**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:236](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L236)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getAverageCashFlowMonthByQuarter`](../interfaces/ILedgerCollection.md#getaveragecashflowmonthbyquarter)

---

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:118](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L118)

the total balance in the ledger collection

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getBalance`](../interfaces/ILedgerCollection.md#getbalance)

---

### getCashFlowMonth()

> **getCashFlowMonth**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:218](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L218)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowMonth`](../interfaces/ILedgerCollection.md#getcashflowmonth)

---

### getCashFlowQuarter()

> **getCashFlowQuarter**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:274](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L274)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowQuarter`](../interfaces/ILedgerCollection.md#getcashflowquarter)

---

### getCashFlowYearAverage()

> **getCashFlowYearAverage**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:200](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L200)

used to get the average cash flow for the year.

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowYearAverage`](../interfaces/ILedgerCollection.md#getcashflowyearaverage)

---

### getLastLedgerMonth()

> **getLastLedgerMonth**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:410](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L410)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLastLedgerMonth`](../interfaces/ILedgerCollection.md#getlastledgermonth)

---

### getLatestLedgerItem()

> **getLatestLedgerItem**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

Defined in: [ledger/ledger-collection.ts:402](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L402)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLatestLedgerItem`](../interfaces/ILedgerCollection.md#getlatestledgeritem)

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired`): `number`

Defined in: [ledger/ledger-collection.ts:149](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L149)

This method gets the total of savings needed for all properties by x amount of months.

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired

`number` = `6`

#### Returns

`number`

#### Examples

```ts
Example, you typically need 6 months of month per single family home, so if you had 3 homes at 6 months and mortgage was $1000. It would be doing the following: `getMinimumSavings = 3 (SF) * $1000 (mort) * 6 (months) = $18,000`
```

```ts
totals all properties getExpensesByDate * amount needed to save by month, so properties[].getExpensesByDate() * minMonthsRequired.
```

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getMinimumSavings`](../interfaces/ILedgerCollection.md#getminimumsavings)

---

### getMonthlyCashFlowByYear()

> **getMonthlyCashFlowByYear**(`year`?): `number`[]

Defined in: [ledger/ledger-collection.ts:183](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L183)

used to get the cashFlow of all 12 months

#### Parameters

##### year?

`number`

#### Returns

`number`[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getMonthlyCashFlowByYear`](../interfaces/ILedgerCollection.md#getmonthlycashflowbyyear)

---

### getSummariesAnnual()

> **getSummariesAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [ledger/ledger-collection.ts:354](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L354)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummariesAnnual`](../interfaces/ILedgerCollection.md#getsummariesannual)

---

### getSummaryAnnual()

> **getSummaryAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

Defined in: [ledger/ledger-collection.ts:328](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L328)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummaryAnnual`](../interfaces/ILedgerCollection.md#getsummaryannual)

---

### getSummaryMonth()

> **getSummaryMonth**(`date`): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

Defined in: [ledger/ledger-collection.ts:293](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L293)

#### Parameters

##### date

`Date`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummaryMonth`](../interfaces/ILedgerCollection.md#getsummarymonth)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`properties`, `date`, `minMonthsRequired`): `boolean`

Defined in: [ledger/ledger-collection.ts:175](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L175)

determines if there is enough money in the account while forcing a hold on the [getMinimumSavings](LedgerCollection.md#getminimumsavings) amount.

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired

`number` = `6`

#### Returns

`boolean`

#### Example

```
hasMinimumSavings = getBalance >= getMinimumSavings
```

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`hasMinimumSavings`](../interfaces/ILedgerCollection.md#hasminimumsavings)

---

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [ledger/ledger-collection.ts:135](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/ledger/ledger-collection.ts#L135)

is the collection empty?

#### Returns

`boolean`
