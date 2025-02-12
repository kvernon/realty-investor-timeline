[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / ILedgerCollection

# Interface: ILedgerCollection

Defined in: [ledger/ledger-collection.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L10)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L15)

#### Parameters

##### item

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md) | `Iterable`\<[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)\>

#### Returns

`void`

---

### clone()

> **clone**(): [`ILedgerCollection`](ILedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:37](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L37)

#### Returns

[`ILedgerCollection`](ILedgerCollection.md)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L13)

#### Parameters

##### pred?

[`LedgerItemPredicate`](../type-aliases/LedgerItemPredicate.md)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`, `minMonthsRequired`?): `number`

Defined in: [ledger/ledger-collection.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L35)

should be the total balance - savings for single family

#### Parameters

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### minMonthsRequired?

`number`

#### Returns

`number`

---

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [ledger/ledger-collection.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L11)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getCashFlowMonth()

> **getCashFlowMonth**(`date`): `number`

Defined in: [ledger/ledger-collection.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L17)

#### Parameters

##### date

`Date`

#### Returns

`number`

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired`?): `number`

Defined in: [ledger/ledger-collection.ts:19](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L19)

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired?

`number`

#### Returns

`number`

---

### getSummariesAnnual()

> **getSummariesAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [ledger/ledger-collection.ts:27](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L27)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

---

### getSummaryAnnual()

> **getSummaryAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

Defined in: [ledger/ledger-collection.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L25)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

---

### getSummaryMonth()

> **getSummaryMonth**(`date`): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

Defined in: [ledger/ledger-collection.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L23)

#### Parameters

##### date

`Date`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`properties`, `date`, `minMonthsRequired`?): `boolean`

Defined in: [ledger/ledger-collection.ts:21](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/ledger/ledger-collection.ts#L21)

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired?

`number`

#### Returns

`boolean`
