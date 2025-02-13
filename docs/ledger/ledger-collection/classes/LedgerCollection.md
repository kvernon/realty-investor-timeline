[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:62](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L62)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### new LedgerCollection()

> **new LedgerCollection**(): [`LedgerCollection`](LedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:75](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L75)

#### Returns

[`LedgerCollection`](LedgerCollection.md)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:101](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L101)

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

Defined in: [ledger/ledger-collection.ts:287](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L287)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:79](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L79)

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

Defined in: [ledger/ledger-collection.ts:283](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L283)

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

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:91](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L91)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getBalance`](../interfaces/ILedgerCollection.md#getbalance)

---

### getCashFlowMonth()

> **getCashFlowMonth**(`date`): `number`

Defined in: [ledger/ledger-collection.ts:152](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L152)

#### Parameters

##### date

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowMonth`](../interfaces/ILedgerCollection.md#getcashflowmonth)

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired`): `number`

Defined in: [ledger/ledger-collection.ts:122](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L122)

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

### getSummariesAnnual()

> **getSummariesAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [ledger/ledger-collection.ts:236](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L236)

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

Defined in: [ledger/ledger-collection.ts:210](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L210)

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

Defined in: [ledger/ledger-collection.ts:170](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L170)

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

Defined in: [ledger/ledger-collection.ts:148](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L148)

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

Defined in: [ledger/ledger-collection.ts:108](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L108)

is the collection empty?

#### Returns

`boolean`
