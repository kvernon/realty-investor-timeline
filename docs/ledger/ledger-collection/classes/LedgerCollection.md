[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:70](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L70)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### new LedgerCollection()

> **new LedgerCollection**(): [`LedgerCollection`](LedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:83](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L83)

#### Returns

[`LedgerCollection`](LedgerCollection.md)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:113](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L113)

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

Defined in: [ledger/ledger-collection.ts:313](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L313)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:87](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L87)

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

Defined in: [ledger/ledger-collection.ts:291](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L291)

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

Defined in: [ledger/ledger-collection.ts:103](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L103)

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

Defined in: [ledger/ledger-collection.ts:164](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L164)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getCashFlowMonth`](../interfaces/ILedgerCollection.md#getcashflowmonth)

---

### getLastLedgerMonth()

> **getLastLedgerMonth**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:303](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L303)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLastLedgerMonth`](../interfaces/ILedgerCollection.md#getlastledgermonth)

---

### getLatestLedgerItem()

> **getLatestLedgerItem**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

Defined in: [ledger/ledger-collection.ts:295](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L295)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getLatestLedgerItem`](../interfaces/ILedgerCollection.md#getlatestledgeritem)

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired`): `number`

Defined in: [ledger/ledger-collection.ts:134](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L134)

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

Defined in: [ledger/ledger-collection.ts:244](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L244)

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

Defined in: [ledger/ledger-collection.ts:218](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L218)

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

Defined in: [ledger/ledger-collection.ts:178](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L178)

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

Defined in: [ledger/ledger-collection.ts:160](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L160)

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

Defined in: [ledger/ledger-collection.ts:120](https://github.com/kvernon/realty-investor-timeline/blob/cec7f590aef4aded8ee94008f5b37aa0db4daadd/src/ledger/ledger-collection.ts#L120)

is the collection empty?

#### Returns

`boolean`
