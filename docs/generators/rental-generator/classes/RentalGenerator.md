[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [generators/rental-generator](../index.md) / RentalGenerator

# Class: RentalGenerator\<T\>

Defined in: [generators/rental-generator.ts:14](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L14)

## Type Parameters

• **T** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Implements

- [`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md)
- [`IRentalGenerator`](../interfaces/IRentalGenerator.md)\<`T`\>

## Constructors

### new RentalGenerator()

> **new RentalGenerator**\<`T`\>(`cache`, `generateProperty`): [`RentalGenerator`](RentalGenerator.md)\<`T`\>

Defined in: [generators/rental-generator.ts:43](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L43)

#### Parameters

##### cache

[`IValueCache`](../../../caching/value-cache/interfaces/IValueCache.md)\<`T`\>

##### generateProperty

[`GenerateProperty`](../../generate-property/type-aliases/GenerateProperty.md)\<`T`\>

#### Returns

[`RentalGenerator`](RentalGenerator.md)\<`T`\>

## Properties

### highestCashFlow

> **highestCashFlow**: `number`

Defined in: [generators/rental-generator.ts:34](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L34)

I've seen as high as 630 a month, but on average, depending on the area, I've seen 450 a month

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestCashFlow`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestcashflow)

---

### highestEquityCapturePercent

> **highestEquityCapturePercent**: `number`

Defined in: [generators/rental-generator.ts:37](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L37)

used to generate a random equity amount, this is the high value

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestEquityCapturePercent`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestequitycapturepercent)

---

### highestMinSellInYears

> **highestMinSellInYears**: `number`

Defined in: [generators/rental-generator.ts:31](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L31)

For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestMinSellInYears`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestminsellinyears)

---

### highestPurchasePrice

> **highestPurchasePrice**: `number`

Defined in: [generators/rental-generator.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L18)

used to generate a random price amount, this is the high value

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestPurchasePrice`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestpurchaseprice)

---

### highestSellAppreciationPercent

> **highestSellAppreciationPercent**: `number`

Defined in: [generators/rental-generator.ts:28](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L28)

for single family it is as high as 14.5 %

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestSellAppreciationPercent`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestsellappreciationpercent)

---

### lowestCashFlow

> **lowestCashFlow**: `number`

Defined in: [generators/rental-generator.ts:33](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L33)

typically 200 is the lowest

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestCashFlow`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestcashflow)

---

### lowestEquityCapturePercent

> **lowestEquityCapturePercent**: `number`

Defined in: [generators/rental-generator.ts:36](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L36)

used to generate a random equity amount, this is the low value

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestEquityCapturePercent`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestequitycapturepercent)

---

### lowestMinSellInYears

> **lowestMinSellInYears**: `number`

Defined in: [generators/rental-generator.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L30)

For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestMinSellInYears`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestminsellinyears)

---

### lowestPurchasePrice

> **lowestPurchasePrice**: `number`

Defined in: [generators/rental-generator.ts:17](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L17)

used to generate a random price amount, this is the low value

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestPurchasePrice`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestpurchaseprice)

---

### lowestSellAppreciationPercent

> **lowestSellAppreciationPercent**: `number`

Defined in: [generators/rental-generator.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L23)

for single family it's around 4%

#### Implementation of

[`IPropertyEntityOptions`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestSellAppreciationPercent`](../../i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestsellappreciationpercent)

---

### maxRentalOpportunities

> **maxRentalOpportunities**: `number`

Defined in: [generators/rental-generator.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L15)

## Methods

### getRentals()

> **getRentals**(`rentalClassType`, `today`, `settings`?): `T`[]

Defined in: [generators/rental-generator.ts:48](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L48)

#### Parameters

##### rentalClassType

() => `T`

##### today

`Date`

##### settings?

[`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

#### Returns

`T`[]

#### Implementation of

[`IRentalGenerator`](../interfaces/IRentalGenerator.md).[`getRentals`](../interfaces/IRentalGenerator.md#getrentals)

---

### removeRentalById()

> **removeRentalById**(`id`, `rentalClassType`, `today`?): `void`

Defined in: [generators/rental-generator.ts:88](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L88)

#### Parameters

##### id

`string`

##### rentalClassType

() => `T`

##### today?

`Date`

#### Returns

`void`

#### Implementation of

[`IRentalGenerator`](../interfaces/IRentalGenerator.md).[`removeRentalById`](../interfaces/IRentalGenerator.md#removerentalbyid)
