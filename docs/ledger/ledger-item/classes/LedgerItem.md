[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-item](../index.md) / LedgerItem

# Class: LedgerItem

Defined in: [ledger/ledger-item.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L7)

this is an entry into the account. Think of it as a checking account, and it's simply a transaction line.

## Constructors

### new LedgerItem()

> **new LedgerItem**(`amount`?, `type`?, `created`?, `note`?): [`LedgerItem`](LedgerItem.md)

Defined in: [ledger/ledger-item.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L13)

#### Parameters

##### amount?

`number`

##### type?

[`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

##### created?

`Date`

##### note?

`string`

#### Returns

[`LedgerItem`](LedgerItem.md)

## Properties

### amount

> **amount**: `number` = `0`

Defined in: [ledger/ledger-item.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L10)

---

### created?

> `optional` **created**: `Date`

Defined in: [ledger/ledger-item.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L9)

---

### note?

> `optional` **note**: `string`

Defined in: [ledger/ledger-item.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L11)

---

### type

> **type**: [`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

Defined in: [ledger/ledger-item.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L8)

## Methods

### clone()

> **clone**(): [`LedgerItem`](LedgerItem.md)

Defined in: [ledger/ledger-item.ts:86](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L86)

#### Returns

[`LedgerItem`](LedgerItem.md)

---

### dateLessThanOrEqualTo()

> **dateLessThanOrEqualTo**(`today`): `boolean`

Defined in: [ledger/ledger-item.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L50)

#### Parameters

##### today

`Date`

#### Returns

`boolean`

---

### dateMatchesYear()

> **dateMatchesYear**(`year`): `boolean`

Defined in: [ledger/ledger-item.ts:66](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L66)

#### Parameters

##### year

`number`

#### Returns

`boolean`

---

### dateMatchesYearAndMonth()

> **dateMatchesYearAndMonth**(`today`): `boolean`

Defined in: [ledger/ledger-item.ts:38](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L38)

#### Parameters

##### today

`Date`

#### Returns

`boolean`

---

### dateNotGreaterThan()

> **dateNotGreaterThan**(`today`): `boolean`

Defined in: [ledger/ledger-item.ts:58](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L58)

#### Parameters

##### today

`Date`

#### Returns

`boolean`

---

### getMonth()

> **getMonth**(): `number`

Defined in: [ledger/ledger-item.ts:26](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L26)

#### Returns

`number`

---

### getYear()

> **getYear**(): `number`

Defined in: [ledger/ledger-item.ts:78](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L78)

#### Returns

`number`

---

### isAmountGreaterThanZero()

> **isAmountGreaterThanZero**(): `boolean`

Defined in: [ledger/ledger-item.ts:34](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L34)

#### Returns

`boolean`

---

### typeMatches()

> **typeMatches**(`itemType`): `boolean`

Defined in: [ledger/ledger-item.ts:74](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/ledger/ledger-item.ts#L74)

#### Parameters

##### itemType

[`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

#### Returns

`boolean`
