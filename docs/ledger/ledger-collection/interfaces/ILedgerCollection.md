[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / ILedgerCollection

# Interface: ILedgerCollection

Defined in: [ledger/ledger-collection.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L10)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:19](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L19)

#### Parameters

##### item

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md) \| `Iterable`\<[`LedgerItem`](../../ledger-item/classes/LedgerItem.md), `any`, `any`\>

#### Returns

`void`

---

### clone()

> **clone**(): `ILedgerCollection`

Defined in: [ledger/ledger-collection.ts:81](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L81)

#### Returns

`ILedgerCollection`

---

### filter()

> **filter**(`pred?`): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L17)

#### Parameters

##### pred?

[`LedgerItemPredicate`](../type-aliases/LedgerItemPredicate.md)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`, `minMonthsRequired?`): `number`

Defined in: [ledger/ledger-collection.ts:75](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L75)

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

### getAverageCashFlowMonthByQuarter()

> **getAverageCashFlowMonthByQuarter**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L23)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getBalance()

> **getBalance**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L15)

the total balance in the ledger collection

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getCashFlowMonth()

> **getCashFlowMonth**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:21](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L21)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getCashFlowQuarter()

> **getCashFlowQuarter**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L25)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getCashFlowYearAverage()

> **getCashFlowYearAverage**(`date?`): `number`

Defined in: [ledger/ledger-collection.ts:61](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L61)

used to get the average cash flow for the year.

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getLastLedgerMonth()

> **getLastLedgerMonth**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:79](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L79)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

---

### getLatestLedgerItem()

> **getLatestLedgerItem**(): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

Defined in: [ledger/ledger-collection.ts:77](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L77)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired?`): `number`

Defined in: [ledger/ledger-collection.ts:37](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L37)

This method gets the total of savings needed for all properties by x amount of months.

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired?

`number`

#### Returns

`number`

#### Examples

```ts
Example, you typically need 6 months of month per single family home, so if you had 3 homes at 6 months and mortgage was $1000. It would be doing the following: `getMinimumSavings = 3 (SF) * $1000 (mort) * 6 (months) = $18,000`
```

```ts
totals all properties getExpensesByDate * amount needed to save by month, so properties[].getExpensesByDate() * minMonthsRequired.
```

---

### getMonthlyCashFlowByYear()

> **getMonthlyCashFlowByYear**(`year?`): `number`[]

Defined in: [ledger/ledger-collection.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L55)

used to get the cashFlow of all 12 months

#### Parameters

##### year?

`number`

#### Returns

`number`[]

---

### getSummariesAnnual()

> **getSummariesAnnual**(`year?`): [`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)[]

Defined in: [ledger/ledger-collection.ts:67](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L67)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)[]

---

### getSummaryAnnual()

> **getSummaryAnnual**(`year?`): [`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

Defined in: [ledger/ledger-collection.ts:65](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L65)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

---

### getSummaryMonth()

> **getSummaryMonth**(`date`): [`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

Defined in: [ledger/ledger-collection.ts:63](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L63)

#### Parameters

##### date

`Date`

#### Returns

[`ILedgerDetailSummary`](../../i-ledger-detail-summary/interfaces/ILedgerDetailSummary.md)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`properties`, `date`, `minMonthsRequired?`): `boolean`

Defined in: [ledger/ledger-collection.ts:49](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/ledger/ledger-collection.ts#L49)

determines if there is enough money in the account while forcing a hold on the [getMinimumSavings](#getminimumsavings) amount.

#### Parameters

##### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

##### date

`Date`

##### minMonthsRequired?

`number`

#### Returns

`boolean`

#### Example

```
hasMinimumSavings = getBalance >= getMinimumSavings
```
