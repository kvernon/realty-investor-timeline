[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:66](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L66)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### new LedgerCollection()

> **new LedgerCollection**(): [`LedgerCollection`](LedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:79](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L79)

#### Returns

[`LedgerCollection`](LedgerCollection.md)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:109](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L109)

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

Defined in: [ledger/ledger-collection.ts:295](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L295)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:83](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L83)

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

Defined in: [ledger/ledger-collection.ts:291](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L291)

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

Defined in: [ledger/ledger-collection.ts:99](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L99)

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

> **getCashFlowMonth**(`date`): `number`

Defined in: [ledger/ledger-collection.ts:160](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L160)

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

Defined in: [ledger/ledger-collection.ts:130](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L130)

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

Defined in: [ledger/ledger-collection.ts:244](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L244)

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

Defined in: [ledger/ledger-collection.ts:218](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L218)

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

Defined in: [ledger/ledger-collection.ts:178](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L178)

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

Defined in: [ledger/ledger-collection.ts:156](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L156)

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

Defined in: [ledger/ledger-collection.ts:116](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/ledger/ledger-collection.ts#L116)

is the collection empty?

#### Returns

`boolean`
