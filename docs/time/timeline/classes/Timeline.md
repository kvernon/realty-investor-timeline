[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/timeline](../index.md) / Timeline

# Class: Timeline

Defined in: [time/timeline.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L18)

## Implements

- [`ITimeline`](../interfaces/ITimeline.md)

## Constructors

### new Timeline()

> **new Timeline**(`startDate`, `endDate`, `rentals`, `user`): [`Timeline`](Timeline.md)

Defined in: [time/timeline.ts:19](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L19)

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

Defined in: [time/timeline.ts:26](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L26)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`endDate`](../interfaces/ITimeline.md#enddate)

---

### rentals

> **rentals**: [`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

Defined in: [time/timeline.ts:27](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L27)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`rentals`](../interfaces/ITimeline.md#rentals)

---

### startDate

> **startDate**: `Date`

Defined in: [time/timeline.ts:28](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L28)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`startDate`](../interfaces/ITimeline.md#startdate)

---

### user

> **user**: [`IUser`](../../../account/user/interfaces/IUser.md)

Defined in: [time/timeline.ts:29](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L29)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`user`](../interfaces/ITimeline.md#user)

## Methods

### clone()

> **clone**(): [`ITimeline`](../interfaces/ITimeline.md)

Defined in: [time/timeline.ts:39](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L39)

#### Returns

[`ITimeline`](../interfaces/ITimeline.md)

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`clone`](../interfaces/ITimeline.md#clone)

---

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [time/timeline.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L35)

#### Parameters

##### date?

`Date`

#### Returns

`number`

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`getBalance`](../interfaces/ITimeline.md#getbalance)

---

### getCashFlowMonthByEndDate()

> **getCashFlowMonthByEndDate**(): `number`

Defined in: [time/timeline.ts:31](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L31)

#### Returns

`number`

#### Implementation of

[`ITimeline`](../interfaces/ITimeline.md).[`getCashFlowMonthByEndDate`](../interfaces/ITimeline.md#getcashflowmonthbyenddate)
