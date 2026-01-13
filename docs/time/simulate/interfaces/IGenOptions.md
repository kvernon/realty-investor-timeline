[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/simulate](../index.md) / IGenOptions

# Interface: IGenOptions

Defined in: [time/simulate.ts:20](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/time/simulate.ts#L20)

## Extends

- [`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md)

## Properties

### highestCashFlow

> **highestCashFlow**: `number`

Defined in: [generators/i-property-entity-options.ts:40](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L40)

I've seen as high as 630 a month, but on average, depending on the area, I've seen 450 a month

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestCashFlow`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestcashflow)

---

### highestEquityCapturePercent

> **highestEquityCapturePercent**: `number`

Defined in: [generators/i-property-entity-options.ts:20](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L20)

used to generate a random equity amount, this is the high value

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestEquityCapturePercent`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestequitycapturepercent)

---

### highestMinSellInYears

> **highestMinSellInYears**: `number`

Defined in: [generators/i-property-entity-options.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L50)

For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestMinSellInYears`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestminsellinyears)

---

### highestPurchasePrice

> **highestPurchasePrice**: `number`

Defined in: [generators/i-property-entity-options.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L10)

used to generate a random price amount, this is the high value

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestPurchasePrice`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestpurchaseprice)

---

### highestSellAppreciationPercent

> **highestSellAppreciationPercent**: `number`

Defined in: [generators/i-property-entity-options.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L30)

for single family it is as high as 14.5 %

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`highestSellAppreciationPercent`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#highestsellappreciationpercent)

---

### lowestCashFlow

> **lowestCashFlow**: `number`

Defined in: [generators/i-property-entity-options.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L35)

typically 200 is the lowest

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestCashFlow`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestcashflow)

---

### lowestEquityCapturePercent

> **lowestEquityCapturePercent**: `number`

Defined in: [generators/i-property-entity-options.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L15)

used to generate a random equity amount, this is the low value

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestEquityCapturePercent`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestequitycapturepercent)

---

### lowestMinSellInYears

> **lowestMinSellInYears**: `number`

Defined in: [generators/i-property-entity-options.ts:45](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L45)

For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestMinSellInYears`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestminsellinyears)

---

### lowestPurchasePrice

> **lowestPurchasePrice**: `number`

Defined in: [generators/i-property-entity-options.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L5)

used to generate a random price amount, this is the low value

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestPurchasePrice`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestpurchaseprice)

---

### lowestSellAppreciationPercent

> **lowestSellAppreciationPercent**: `number`

Defined in: [generators/i-property-entity-options.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/generators/i-property-entity-options.ts#L25)

for single family it's around 4%

#### Inherited from

[`IPropertyEntityOptions`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md).[`lowestSellAppreciationPercent`](../../../generators/i-property-entity-options/interfaces/IPropertyEntityOptions.md#lowestsellappreciationpercent)

---

### maxMonthsToCache?

> `optional` **maxMonthsToCache**: `number`

Defined in: [time/simulate.ts:29](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/time/simulate.ts#L29)

Used to say how long a property should be cached

---

### maxRentalOpportunities

> **maxRentalOpportunities**: `number`

Defined in: [time/simulate.ts:24](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/time/simulate.ts#L24)

Used to provide an amount of Random properties
