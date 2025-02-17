[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/timeline](../index.md) / Timeline

# Class: Timeline

Defined in: [time/timeline.ts:19](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L19)

## Implements

- [`ITimeline`](../interfaces/ITimeline.md)

## Constructors

### new Timeline()

> **new Timeline**(`startDate`, `endDate`, `rentals`, `user`): [`Timeline`](Timeline.md)

Defined in: [time/timeline.ts:20](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L20)

#### Parameters

##### startDate

`Date`

##### endDate

`Date`

##### rentals

[`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

##### user

[`IUser`](../../../account/user/interfaces/IUser.md)

#### Returns

[`Timeline`](Timeline.md)

## Properties

### endDate

> **endDate**: `Date`

Defined in: [time/timeline.ts:27](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L27)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`endDate`](../interfaces/ITimeline.md#enddate)

---

### rentals

> **rentals**: [`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

Defined in: [time/timeline.ts:28](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L28)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`rentals`](../interfaces/ITimeline.md#rentals)

---

### startDate

> **startDate**: `Date`

Defined in: [time/timeline.ts:29](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L29)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`startDate`](../interfaces/ITimeline.md#startdate)

---

### user

> **user**: [`IUser`](../../../account/user/interfaces/IUser.md)

Defined in: [time/timeline.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L30)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`user`](../interfaces/ITimeline.md#user)

## Methods

### clone()

> **clone**(): [`ITimeline`](../interfaces/ITimeline.md)

Defined in: [time/timeline.ts:61](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L61)

#### Returns

[`ITimeline`](../interfaces/ITimeline.md)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`clone`](../interfaces/ITimeline.md#clone)

---

### getAllSummariesAnnual()

> **getAllSummariesAnnual**(): [`ILedgerSummary`](../../../ledger/i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [time/timeline.ts:47](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L47)

#### Returns

[`ILedgerSummary`](../../../ledger/i-ledger-summary/interfaces/ILedgerSummary.md)[]

---

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [time/timeline.ts:39](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L39)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`getBalance`](../interfaces/ITimeline.md#getbalance)

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(): `number`

Defined in: [time/timeline.ts:32](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L32)

#### Returns

`number`

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`getEstimatedMonthlyCashFlow`](../interfaces/ITimeline.md#getestimatedmonthlycashflow)

---

### getSummariesAnnualByYear()

> **getSummariesAnnualByYear**(`year`?): [`ILedgerSummary`](../../../ledger/i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [time/timeline.ts:43](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/time/timeline.ts#L43)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../../ledger/i-ledger-summary/interfaces/ILedgerSummary.md)[]
