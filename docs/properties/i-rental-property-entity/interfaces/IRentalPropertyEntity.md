[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/i-rental-property-entity](../index.md) / IRentalPropertyEntity

# Interface: IRentalPropertyEntity

Defined in: [properties/i-rental-property-entity.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L5)

## Extends

- [`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md)

## Properties

### address

> **address**: `string`

Defined in: [properties/i-property-entity.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L13)

address of property

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`address`](../../i-property-entity/interfaces/IPropertyEntity.md#address)

---

### availableEndDate

> **availableEndDate**: `Date`

Defined in: [properties/i-entity-existence.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-entity-existence.ts#L9)

date which property was removed from the timeline.. think of it like someone else purchased this property

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`availableEndDate`](../../i-property-entity/interfaces/IPropertyEntity.md#availableenddate)

---

### availableStartDate

> **availableStartDate**: `Date`

Defined in: [properties/i-entity-existence.ts:5](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-entity-existence.ts#L5)

date which property was generated or was available for purchase

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`availableStartDate`](../../i-property-entity/interfaces/IPropertyEntity.md#availablestartdate)

---

### costDownPrice

> **costDownPrice**: `number`

Defined in: [properties/i-property-entity.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L23)

it's the purchase down

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`costDownPrice`](../../i-property-entity/interfaces/IPropertyEntity.md#costdownprice)

---

### equityCapturePercent

> **equityCapturePercent**: `number`

Defined in: [properties/i-property-entity.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L50)

this can be between 10 - 20%

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`equityCapturePercent`](../../i-property-entity/interfaces/IPropertyEntity.md#equitycapturepercent)

---

### id

> **id**: `string`

Defined in: [properties/i-property-entity.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L8)

unique identifier

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`id`](../../i-property-entity/interfaces/IPropertyEntity.md#id)

---

### isAvailable

> **isAvailable**: `boolean`

Defined in: [properties/i-rental-property-entity.ts:42](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L42)

---

### isOwned

> **isOwned**: `boolean`

Defined in: [properties/i-rental-property-entity.ts:38](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L38)

---

### minSellYears?

> `optional` **minSellYears**: `number`

Defined in: [properties/i-property-entity.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L35)

number of years to hold the property before being sold

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`minSellYears`](../../i-property-entity/interfaces/IPropertyEntity.md#minsellyears)

---

### offeredInvestmentAmounts

> **offeredInvestmentAmounts**: `number`[]

Defined in: [properties/i-property-entity.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L25)

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`offeredInvestmentAmounts`](../../i-property-entity/interfaces/IPropertyEntity.md#offeredinvestmentamounts)

---

### propertyType

> **propertyType**: [`PropertyType`](../../property-type/enumerations/PropertyType.md)

Defined in: [properties/i-property-entity.ts:55](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L55)

used when evaluating rules

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`propertyType`](../../i-property-entity/interfaces/IPropertyEntity.md#propertytype)

---

### purchaseDate

> **purchaseDate**: `Date`

Defined in: [properties/i-rental-property-entity.ts:6](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L6)

---

### purchasePrice

> **purchasePrice**: `number`

Defined in: [properties/i-property-entity.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L18)

purchase price of the property (may or may not be after repair value, ARV)

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`purchasePrice`](../../i-property-entity/interfaces/IPropertyEntity.md#purchaseprice)

---

### rawCashFlow

> **rawCashFlow**: `number`

Defined in: [properties/i-property-entity.ts:40](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L40)

the cashOnCash return

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`rawCashFlow`](../../i-property-entity/interfaces/IPropertyEntity.md#rawcashflow)

---

### sellPriceAppreciationPercent

> **sellPriceAppreciationPercent**: `number`

Defined in: [properties/i-property-entity.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L30)

the percent at which the property's value grows

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`sellPriceAppreciationPercent`](../../i-property-entity/interfaces/IPropertyEntity.md#sellpriceappreciationpercent)

---

### soldDate

> **soldDate**: `Date`

Defined in: [properties/i-rental-property-entity.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L8)

---

### wasPurchased

> **wasPurchased**: `boolean`

Defined in: [properties/i-rental-property-entity.ts:40](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L40)

## Accessors

### estimatedCashOnCashReturn

#### Get Signature

> **get** **estimatedCashOnCashReturn**(): `number`

Defined in: [properties/i-rental-property-entity.ts:58](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L58)

##### Returns

`number`

---

### estimatedReturnOnCapitalGain

#### Get Signature

> **get** **estimatedReturnOnCapitalGain**(): `number`

Defined in: [properties/i-rental-property-entity.ts:60](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L60)

##### Returns

`number`

---

### rawEstimatedAnnualCashFlow

#### Get Signature

> **get** **rawEstimatedAnnualCashFlow**(): `number`

Defined in: [properties/i-property-entity.ts:45](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-property-entity.ts#L45)

the estimated annual cashFlow return

##### Returns

`number`

#### Inherited from

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md).[`rawEstimatedAnnualCashFlow`](../../i-property-entity/interfaces/IPropertyEntity.md#rawestimatedannualcashflow)

## Methods

### canInvestByUser()

> **canInvestByUser**(`user`, `date`, `properties`): [`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

Defined in: [properties/i-rental-property-entity.ts:44](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L44)

#### Parameters

##### user

[`IUser`](../../../account/user/interfaces/IUser.md)

##### date

`Date`

##### properties

[`IPropertyEntity`](../../i-property-entity/interfaces/IPropertyEntity.md)[]

#### Returns

[`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

---

### canSell()

> **canSell**(`today`): `boolean`

Defined in: [properties/i-rental-property-entity.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L10)

#### Parameters

##### today

`Date`

#### Returns

`boolean`

---

### clone()

> **clone**(): [`IRentalPropertyEntity`](IRentalPropertyEntity.md)

Defined in: [properties/i-rental-property-entity.ts:62](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L62)

#### Returns

[`IRentalPropertyEntity`](IRentalPropertyEntity.md)

---

### getCashFlowByDate()

> **getCashFlowByDate**(`today`): `number`

Defined in: [properties/i-rental-property-entity.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L30)

1. you must have purchased this home
2. this home must not have been sold

#### Parameters

##### today

`Date`

#### Returns

`number`

---

### getEquityFromSell()

> **getEquityFromSell**(`today`): `number`

Defined in: [properties/i-rental-property-entity.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L16)

Determines the equity of a sale by date. Note: [soldDate](IRentalPropertyEntity.md#solddate) must be populated and today and it must match

#### Parameters

##### today

`Date`

#### Returns

`number`

---

### getEstimatedEquityFromSell()

> **getEstimatedEquityFromSell**(`today`, `purchaseDate`?): `number`

Defined in: [properties/i-rental-property-entity.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L23)

used to show a predictive amount for the sell of the property

#### Parameters

##### today

`Date`

used to represent the sell date of the property

##### purchaseDate?

`Date`

optional date

#### Returns

`number`

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(`today`): `number`

Defined in: [properties/i-rental-property-entity.ts:36](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L36)

universal method to determine cash flow on a monthly basis

#### Parameters

##### today

`Date`

#### Returns

`number`

---

### getExpensesByDate()

> **getExpensesByDate**(`today`): `number`

Defined in: [properties/i-rental-property-entity.ts:56](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L56)

used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount

#### Parameters

##### today

`Date`

#### Returns

`number`

---

### isAvailableByDate()

> **isAvailableByDate**(`today`): `boolean`

Defined in: [properties/i-rental-property-entity.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L50)

used to compare [availableStartDate](../../i-entity-existence/interfaces/IEntityExistence.md#availablestartdate), [today](IRentalPropertyEntity.md#today-6), and [availableEndDate](../../i-entity-existence/interfaces/IEntityExistence.md#availableenddate),

#### Parameters

##### today

`Date`

#### Returns

`boolean`

---

### sellPriceByDate()

> **sellPriceByDate**(`today`): `number`

Defined in: [properties/i-rental-property-entity.ts:68](https://github.com/kvernon/realty-investor-timeline/blob/5a4b50c05937ef4acec617ccfb5124957036558c/src/properties/i-rental-property-entity.ts#L68)

This can be used as an estimate of what the price would be for the property

#### Parameters

##### today

`Date`

#### Returns

`number`
