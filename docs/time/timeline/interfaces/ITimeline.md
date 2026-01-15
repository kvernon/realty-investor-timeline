[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/timeline](../index.md) / ITimeline

# Interface: ITimeline

Defined in: [time/timeline.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L5)

## Properties

### endDate

> **endDate**: `Date`

Defined in: [time/timeline.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L7)

---

### rentals

> **rentals**: [`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

Defined in: [time/timeline.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L8)

---

### startDate

> **startDate**: `Date`

Defined in: [time/timeline.ts:6](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L6)

---

### user

> **user**: [`IUser`](../../../account/user/interfaces/IUser.md)

Defined in: [time/timeline.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L9)

## Methods

### clone()

> **clone**(): [`ITimeline`](ITimeline.md)

Defined in: [time/timeline.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L15)

#### Returns

[`ITimeline`](ITimeline.md)

---

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [time/timeline.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L13)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getCashFlowMonthByEndDate()

> **getCashFlowMonthByEndDate**(): `number`

Defined in: [time/timeline.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/timeline.ts#L11)

#### Returns

`number`
