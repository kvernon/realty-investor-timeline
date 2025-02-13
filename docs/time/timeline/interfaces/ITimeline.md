[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/timeline](../index.md) / ITimeline

# Interface: ITimeline

Defined in: [time/timeline.ts:6](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L6)

## Properties

### endDate

> **endDate**: `Date`

Defined in: [time/timeline.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L8)

---

### rentals

> **rentals**: [`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

Defined in: [time/timeline.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L9)

---

### startDate

> **startDate**: `Date`

Defined in: [time/timeline.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L7)

---

### user

> **user**: [`IUser`](../../../account/user/interfaces/IUser.md)

Defined in: [time/timeline.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L10)

## Methods

### clone()

> **clone**(): [`ITimeline`](ITimeline.md)

Defined in: [time/timeline.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L16)

#### Returns

[`ITimeline`](ITimeline.md)

---

### getBalance()

> **getBalance**(`date`?): `number`

Defined in: [time/timeline.ts:14](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L14)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(): `number`

Defined in: [time/timeline.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/timeline.ts#L12)

#### Returns

`number`
