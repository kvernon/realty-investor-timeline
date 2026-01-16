[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-item](../index.md) / LedgerItem

# Class: LedgerItem

Defined in: [ledger/ledger-item.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L8)

this is an entry into the account. Think of it as a checking account, and it's simply a transaction line.

## Constructors

### new LedgerItem()

> **new LedgerItem**(`amount`?, `type`?, `created`?, `note`?): [`LedgerItem`](LedgerItem.md)

Defined in: [ledger/ledger-item.ts:14](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L14)

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

Defined in: [ledger/ledger-item.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L11)

---

### created?

> `optional` **created**: `Date`

Defined in: [ledger/ledger-item.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L10)

---

### note?

> `optional` **note**: `string`

Defined in: [ledger/ledger-item.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L12)

---

### type

> **type**: [`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

Defined in: [ledger/ledger-item.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L9)

## Methods

### clone()

> **clone**(): [`LedgerItem`](LedgerItem.md)

Defined in: [ledger/ledger-item.ts:151](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L151)

#### Returns

[`LedgerItem`](LedgerItem.md)

---

### dateGreaterThanOrEqualTo()

> **dateGreaterThanOrEqualTo**(`date`): `boolean`

Defined in: [ledger/ledger-item.ts:78](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L78)

returns `true` if date's date is grater than or equal to the created date

#### Parameters

##### date

`Date`

#### Returns

`boolean`

---

### dateLessThanOrEqualTo()

> **dateLessThanOrEqualTo**(`date`): `boolean`

Defined in: [ledger/ledger-item.ts:66](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L66)

returns `true` if date's date is less than or equal to the created date

#### Parameters

##### date

`Date`

#### Returns

`boolean`

---

### dateLessThanOrEqualToAndQuarter()

> **dateLessThanOrEqualToAndQuarter**(`date`): `boolean`

Defined in: [ledger/ledger-item.ts:106](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L106)

returns `true` if date's date is more recent than or equal to the created date and the quarter matches

#### Parameters

##### date

`Date`

#### Returns

`boolean`

---

### dateMatchesYear()

> **dateMatchesYear**(`year`): `boolean`

Defined in: [ledger/ledger-item.ts:94](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L94)

#### Parameters

##### year

`number`

#### Returns

`boolean`

---

### dateMatchesYearAndMonth()

> **dateMatchesYearAndMonth**(`date`): `boolean`

Defined in: [ledger/ledger-item.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L50)

#### Parameters

##### date

`Date`

#### Returns

`boolean`

---

### dateMatchesYearAndQuarter()

> **dateMatchesYearAndQuarter**(`year`, `quarter`): `boolean`

Defined in: [ledger/ledger-item.ts:127](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L127)

@deprecated, use [dateLessThanOrEqualToAndQuarter](LedgerItem.md#datelessthanorequaltoandquarter)

#### Parameters

##### year

`number`

##### quarter

`number`

#### Returns

`boolean`

---

### dateNotGreaterThan()

> **dateNotGreaterThan**(`date`): `boolean`

Defined in: [ledger/ledger-item.ts:86](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L86)

#### Parameters

##### date

`Date`

#### Returns

`boolean`

---

### getMonth()

> **getMonth**(): `number`

Defined in: [ledger/ledger-item.ts:27](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L27)

#### Returns

`number`

---

### getQuarter()

> **getQuarter**(): `-1` \| [`QuarterType`](../../../utils/get-date-quarter/type-aliases/QuarterType.md)

Defined in: [ledger/ledger-item.ts:38](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L38)

if one is found, a zero based quarter number, otherwise you'll get -1

#### Returns

`-1` \| [`QuarterType`](../../../utils/get-date-quarter/type-aliases/QuarterType.md)

---

### getYear()

> **getYear**(): `number`

Defined in: [ledger/ledger-item.ts:143](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L143)

#### Returns

`number`

---

### isAmountGreaterThanZero()

> **isAmountGreaterThanZero**(): `boolean`

Defined in: [ledger/ledger-item.ts:46](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L46)

#### Returns

`boolean`

---

### typeMatches()

> **typeMatches**(`itemType`): `boolean`

Defined in: [ledger/ledger-item.ts:139](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/ledger/ledger-item.ts#L139)

#### Parameters

##### itemType

[`LedgerItemType`](../../ledger-item-type/enumerations/LedgerItemType.md)

#### Returns

`boolean`
