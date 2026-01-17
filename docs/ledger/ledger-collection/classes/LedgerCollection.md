[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:86](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L86)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### new LedgerCollection()

> **new LedgerCollection**(): [`LedgerCollection`](LedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:97](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L97)

#### Returns

[`LedgerCollection`](LedgerCollection.md)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:127](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L127)

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

Defined in: [ledger/ledger-collection.ts:414](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L414)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:101](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L101)

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

Defined in: [ledger/ledger-collection.ts:392](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L392)

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

Defined in: [ledger/ledger-collection.ts:178](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L178)

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

Defined in: [ledger/ledger-collection.ts:235](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L235)

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

Defined in: [ledger/ledger-collection.ts:117](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L117)

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

Defined in: [ledger/ledger-collection.ts:217](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L217)

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

Defined in: [ledger/ledger-collection.ts:269](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L269)

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

Defined in: [ledger/ledger-collection.ts:199](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L199)

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

Defined in: [ledger/ledger-collection.ts:404](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L404)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLastLedgerMonth`](../interfaces/ILedgerCollection.md#getlastledgermonth)

---

### getLatestLedgerItem()

> **getLatestLedgerItem**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

Defined in: [ledger/ledger-collection.ts:396](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L396)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLatestLedgerItem`](../interfaces/ILedgerCollection.md#getlatestledgeritem)

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired`): `number`

Defined in: [ledger/ledger-collection.ts:148](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L148)

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

Defined in: [ledger/ledger-collection.ts:182](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L182)

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

Defined in: [ledger/ledger-collection.ts:348](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L348)

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

Defined in: [ledger/ledger-collection.ts:322](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L322)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummaryAnnual`](../interfaces/ILedgerCollection.md#getsummaryannual)

---

### getSummaryMonth()

> **getSummaryMonth**(`date`): [`ILedgerDetailSummary`](../../i-ledger-summary/interfaces/ILedgerDetailSummary.md)

Defined in: [ledger/ledger-collection.ts:285](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L285)

#### Parameters

##### date

`Date`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-summary/interfaces/ILedgerDetailSummary.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getSummaryMonth`](../interfaces/ILedgerCollection.md#getsummarymonth)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`properties`, `date`, `minMonthsRequired`): `boolean`

Defined in: [ledger/ledger-collection.ts:174](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L174)

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

Defined in: [ledger/ledger-collection.ts:134](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-collection.ts#L134)

is the collection empty?

#### Returns

`boolean`
