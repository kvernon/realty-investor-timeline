[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [ledger/ledger-collection](../index.md) / ILedgerCollection

# Interface: ILedgerCollection

Defined in: [ledger/ledger-collection.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L10)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [ledger/ledger-collection.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L15)

#### Parameters

##### item

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md) | `Iterable`\<[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)\>

#### Returns

`void`

---

### clone()

> **clone**(): [`ILedgerCollection`](ILedgerCollection.md)

Defined in: [ledger/ledger-collection.ts:57](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L57)

#### Returns

[`ILedgerCollection`](ILedgerCollection.md)

---

### filter()

> **filter**(`pred`?): [`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

Defined in: [ledger/ledger-collection.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L13)

#### Parameters

##### pred?

[`LedgerItemPredicate`](../type-aliases/LedgerItemPredicate.md)

#### Returns

[`LedgerItem`](../../ledger-item/classes/LedgerItem.md)[]

---

### getAvailableSavings()

> **getAvailableSavings**(`date`, `properties`, `minMonthsRequired`?): `number`

Defined in: [ledger/ledger-collection.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L55)

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

Defined in: [ledger/ledger-collection.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L11)

#### Parameters

##### date?

`Date`

#### Returns

`number`

---

### getCashFlowMonth()

> **getCashFlowMonth**(`date`): `number`

Defined in: [ledger/ledger-collection.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L17)

#### Parameters

##### date

`Date`

#### Returns

`number`

---

### getMinimumSavings()

> **getMinimumSavings**(`properties`, `date`, `minMonthsRequired`?): `number`

Defined in: [ledger/ledger-collection.ts:29](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L29)

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

### getSummariesAnnual()

> **getSummariesAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

Defined in: [ledger/ledger-collection.ts:47](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L47)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)[]

---

### getSummaryAnnual()

> **getSummaryAnnual**(`year`?): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

Defined in: [ledger/ledger-collection.ts:45](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L45)

#### Parameters

##### year?

`number`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

---

### getSummaryMonth()

> **getSummaryMonth**(`date`): [`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

Defined in: [ledger/ledger-collection.ts:43](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L43)

#### Parameters

##### date

`Date`

#### Returns

[`ILedgerSummary`](../../i-ledger-summary/interfaces/ILedgerSummary.md)

---

### hasMinimumSavings()

> **hasMinimumSavings**(`properties`, `date`, `minMonthsRequired`?): `boolean`

Defined in: [ledger/ledger-collection.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/ledger/ledger-collection.ts#L41)

determines if there is enough money in the account while forcing a hold on the [getMinimumSavings](ILedgerCollection.md#getminimumsavings) amount.

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
