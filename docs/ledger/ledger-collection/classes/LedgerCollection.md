[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:86](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L86)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### Constructor

> **new LedgerCollection**(): `LedgerCollection`

Defined in: [ledger/ledger-collection.ts:98](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L98)

#### Returns

`LedgerCollection`

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:128](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L128)

#### Parameters

##### item

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md) \| `Iterable`\<[`LedgerItem`](../../ledger-item/classes/LedgerItem.md), `any`, `any`\>

#### Returns

`void`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`add`](../interfaces/ILedgerCollection.md#add)

---

### clone()

> **clone**(): [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:419](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L419)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred?`): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:102](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L102)

#### Parameters

##### pred?

[`LedgerItemPredicate`](../type-aliases/LedgerItemPredicate.md)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`filter`](../interfaces/ILedgerCollection.md#filter)

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`, `minMonthsRequired?`): `number`

Defined in: [ledger/ledger-collection.ts:397](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L397)

should be the total balance - savings for single family

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### minMonthsRequired?

`number` = `6`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getAvailableSavings`](../interfaces/ILedgerCollection.md#getavailablesavings)

---

### getAverageByType()

> **getAverageByType**(`collection`, `type`): `number`

Defined in: [ledger/ledger-collection.ts:181](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L181)

#### Parameters

##### collection

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

##### type

[`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

#### Returns

`number`

---

### getAverageCashFlowMonthByQuarter()

> **getAverageCashFlowMonthByQuarter**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:238](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L238)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getAverageCashFlowMonthByQuarter`](../interfaces/ILedgerCollection.md#getaveragecashflowmonthbyquarter)

---

### getBalance()

> **getBalance**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:118](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L118)

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

> **getCashFlowMonth**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:220](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L220)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowMonth`](../interfaces/ILedgerCollection.md#getcashflowmonth)

---

### getCashFlowQuarter()

> **getCashFlowQuarter**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:272](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L272)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowQuarter`](../interfaces/ILedgerCollection.md#getcashflowquarter)

---

### getCashFlowYearAverage()

> **getCashFlowYearAverage**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:202](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L202)

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

Defined in: [ledger/ledger-collection.ts:409](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L409)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLastLedgerMonth`](../interfaces/ILedgerCollection.md#getlastledgermonth)

---

### getLatestLedgerItem()

> **getLatestLedgerItem**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

Defined in: [ledger/ledger-collection.ts:401](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L401)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLatestLedgerItem`](../interfaces/ILedgerCollection.md#getlatestledgeritem)

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired?`): `number`

Defined in: [ledger/ledger-collection.ts:151](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L151)

This method gets the total of savings needed for all properties by x amount of months.

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired?

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

> **getMonthlyCashFlowByYear**(`year?`): `number`[]

Defined in: [ledger/ledger-collection.ts:185](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L185)

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

> **getSummariesAnnual**(`year?`): [`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)[]

Defined in: [ledger/ledger-collection.ts:353](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L353)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummariesAnnual`](../interfaces/ILedgerCollection.md#getsummariesannual)

---

### getSummaryAnnual()

> **getSummaryAnnual**(`year?`): [`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

Defined in: [ledger/ledger-collection.ts:325](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L325)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummaryAnnual`](../interfaces/ILedgerCollection.md#getsummaryannual)

---

### getSummaryMonth()

> **getSummaryMonth**(`date`): [`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

Defined in: [ledger/ledger-collection.ts:288](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L288)

#### Parameters

##### date

`Date`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummaryMonth`](../interfaces/ILedgerCollection.md#getsummarymonth)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`properties`, `date`, `minMonthsRequired?`): `boolean`

Defined in: [ledger/ledger-collection.ts:177](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L177)

determines if there is enough money in the account while forcing a hold on the [getMinimumSavings](#getminimumsavings) amount.

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired?

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

Defined in: [ledger/ledger-collection.ts:137](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L137)

is the collection empty?

#### Returns

`boolean`
