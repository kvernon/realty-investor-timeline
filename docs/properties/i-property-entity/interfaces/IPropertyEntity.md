[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/i-property-entity](../index.md) / IPropertyEntity

# Interface: IPropertyEntity

Defined in: [properties/i-property-entity.ts:4](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L4)

## Extends

- [`IEntityExistence`](../../i-entity-existence/interfaces/IEntityExistence.md)

## Extended by

- [`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Properties

### address

> **address**: `string`

Defined in: [properties/i-property-entity.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L13)

address of property

---

### availableEndDate

> **availableEndDate**: `Date`

Defined in: [properties/i-entity-existence.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-entity-existence.ts#L9)

date which property was removed from the timeline.. think of it like someone else purchased this property

#### Inherited from

[`IEntityExistence`](../../i-entity-existence/interfaces/IEntityExistence.md).[`availableEndDate`](../../i-entity-existence/interfaces/IEntityExistence.md#availableenddate)

---

### availableStartDate

> **availableStartDate**: `Date`

Defined in: [properties/i-entity-existence.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-entity-existence.ts#L5)

date which property was generated or was available for purchase

#### Inherited from

[`IEntityExistence`](../../i-entity-existence/interfaces/IEntityExistence.md).[`availableStartDate`](../../i-entity-existence/interfaces/IEntityExistence.md#availablestartdate)

---

### costDownPrice

> **costDownPrice**: `number`

Defined in: [properties/i-property-entity.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L23)

it's the purchase down

---

### equityCapturePercent

> **equityCapturePercent**: `number`

Defined in: [properties/i-property-entity.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L50)

this can be between 10 - 20%

---

### id

> **id**: `string`

Defined in: [properties/i-property-entity.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L8)

unique identifier

---

### minSellYears?

> `optional` **minSellYears**: `number`

Defined in: [properties/i-property-entity.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L35)

number of years to hold the property before being sold

---

### offeredInvestmentAmounts

> **offeredInvestmentAmounts**: `number`[]

Defined in: [properties/i-property-entity.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L25)

---

### propertyType

> **propertyType**: [`PropertyType`](../../property-type/enumerations/PropertyType.md)

Defined in: [properties/i-property-entity.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L55)

used when evaluating rules

---

### purchasePrice

> **purchasePrice**: `number`

Defined in: [properties/i-property-entity.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L18)

purchase price of the property (may or may not be after repair value, ARV)

---

### rawCashFlow

> **rawCashFlow**: `number`

Defined in: [properties/i-property-entity.ts:40](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L40)

the cashOnCash return

---

### sellPriceAppreciationPercent

> **sellPriceAppreciationPercent**: `number`

Defined in: [properties/i-property-entity.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L30)

the percent at which the property's value grows

## Accessors

### rawEstimatedAnnualCashFlow

#### Get Signature

> **get** **rawEstimatedAnnualCashFlow**(): `number`

Defined in: [properties/i-property-entity.ts:45](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/properties/i-property-entity.ts#L45)

the estimated annual cashFlow return

##### Returns

`number`
