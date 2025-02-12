[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / LedgerCollection

# Class: LedgerCollection

Defined in: [ledger/ledger-collection.ts:42](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L42)

## Implements

- [`ILedgerCollection`](../interfaces/ILedgerCollection.md)

## Constructors

### new LedgerCollection()

> **new LedgerCollection**(): [`LedgerCollection`](LedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L55)

#### Returns

[`LedgerCollection`](LedgerCollection.md)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:81](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L81)

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

Defined in: [ledger/ledger-collection.ts:244](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L244)

#### Returns

[`ILedgerCollection`](../interfaces/ILedgerCollection.md)

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`clone`](../interfaces/ILedgerCollection.md#clone)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:59](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L59)

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

Defined in: [ledger/ledger-collection.ts:240](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L240)

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

Defined in: [ledger/ledger-collection.ts:71](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L71)

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

Defined in: [ledger/ledger-collection.ts:109](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L109)

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

Defined in: [ledger/ledger-collection.ts:89](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L89)

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired

`number` = `6`

#### Returns

`number`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`getMinimumSavings`](../interfaces/ILedgerCollection.md#getminimumsavings)

---

### getSummariesAnnual()

> **getSummariesAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [ledger/ledger-collection.ts:193](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L193)

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

Defined in: [ledger/ledger-collection.ts:167](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L167)

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

Defined in: [ledger/ledger-collection.ts:127](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L127)

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

Defined in: [ledger/ledger-collection.ts:105](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L105)

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired

`number` = `6`

#### Returns

`boolean`

#### Implementation of

[`ILedgerCollection`](../interfaces/ILedgerCollection.md).[`hasMinimumSavings`](../interfaces/ILedgerCollection.md#hasminimumsavings)

---

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [ledger/ledger-collection.ts:85](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L85)

#### Returns

`boolean`
