[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/rental-passive-apartment](../index.md) / RentalPassiveApartment

# Class: RentalPassiveApartment

Defined in: [properties/rental-passive-apartment.ts:24](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L24)

## Implements

- [`IEntityExistence`](../../i-entity-existence/interfaces/IEntityExistence.md)
- [`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Constructors

### new RentalPassiveApartment()

> **new RentalPassiveApartment**(): [`RentalPassiveApartment`](RentalPassiveApartment.md)

#### Returns

[`RentalPassiveApartment`](RentalPassiveApartment.md)

## Properties

### address

> **address**: `string`

Defined in: [properties/rental-passive-apartment.ts:48](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L48)

address of property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`address`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#address)

---

### availableEndDate

> **availableEndDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:57](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L57)

date which property was removed from the timeline.. think of it like someone else purchased this property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`availableEndDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#availableenddate)

---

### availableStartDate

> **availableStartDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:52](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L52)

date which property was generated or was available for purchase

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`availableStartDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#availablestartdate)

---

### costDownPrice

> **costDownPrice**: `number`

Defined in: [properties/rental-passive-apartment.ts:136](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L136)

this will be the passive's contribution, which is the full chunk from one of the values for [offeredInvestmentAmounts](RentalPassiveApartment.md#offeredinvestmentamounts)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`costDownPrice`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#costdownprice)

---

### equityCapturePercent

> **equityCapturePercent**: `number`

Defined in: [properties/rental-passive-apartment.ts:141](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L141)

while we have equity capture in this example, know that cap rate is what determines true value.

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`equityCapturePercent`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#equitycapturepercent)

---

### id

> **id**: `string`

Defined in: [properties/rental-passive-apartment.ts:43](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L43)

unique identifier

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`id`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#id)

---

### minSellYears

> **minSellYears**: `number`

Defined in: [properties/rental-passive-apartment.ts:62](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L62)

number of years to hold the property before being sold, default is 0. and this is used to calculated the [minSellDate](RentalPassiveApartment.md#minselldate)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`minSellYears`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#minsellyears)

---

### offeredInvestmentAmounts

> **offeredInvestmentAmounts**: `number`[]

Defined in: [properties/rental-passive-apartment.ts:38](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L38)

a range of amounts that the user can invest for the property: typically these are $25,000, $50,000, $100,000, or $200,000

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`offeredInvestmentAmounts`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#offeredinvestmentamounts)

---

### propertyType

> `readonly` **propertyType**: [`PropertyType`](../../property-type/enumerations/PropertyType.md) = `PropertyType.PassiveApartment`

Defined in: [properties/rental-passive-apartment.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L25)

used when evaluating rules

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`propertyType`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#propertytype)

---

### purchaseDate

> **purchaseDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:160](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L160)

The date the property was acquired

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`purchaseDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#purchasedate)

---

### purchasePrice

> **purchasePrice**: `number`

Defined in: [properties/rental-passive-apartment.ts:104](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L104)

At the time of purchase the ARV of the property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`purchasePrice`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#purchaseprice)

---

### rawCashFlow

> **rawCashFlow**: `number`

Defined in: [properties/rental-passive-apartment.ts:143](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L143)

the cashOnCash return

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`rawCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#rawcashflow)

---

### sellPriceAppreciationPercent

> **sellPriceAppreciationPercent**: `number` = `4`

Defined in: [properties/rental-passive-apartment.ts:109](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L109)

we know appreciation is incorrect for apartments, they use a cap rate

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`sellPriceAppreciationPercent`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#sellpriceappreciationpercent)

---

### soldDate

> **soldDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:165](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L165)

The date the property was sold

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`soldDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#solddate)

## Accessors

### estimatedCashOnCashReturn

#### Get Signature

> **get** **estimatedCashOnCashReturn**(): `number`

Defined in: [properties/rental-passive-apartment.ts:239](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L239)

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`estimatedCashOnCashReturn`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#estimatedcashoncashreturn)

---

### estimatedReturnOnCapitalGain

#### Get Signature

> **get** **estimatedReturnOnCapitalGain**(): `number`

Defined in: [properties/rental-passive-apartment.ts:247](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L247)

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`estimatedReturnOnCapitalGain`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#estimatedreturnoncapitalgain)

---

### investmentPercent

#### Get Signature

> **get** **investmentPercent**(): `number`

Defined in: [properties/rental-passive-apartment.ts:114](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L114)

is a percentage number of xx.xx format

##### Returns

`number`

---

### isOwned

#### Get Signature

> **get** **isOwned**(): `boolean`

Defined in: [properties/rental-passive-apartment.ts:83](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L83)

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`isOwned`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#isowned)

---

### minSellDate

#### Get Signature

> **get** **minSellDate**(): `Date`

Defined in: [properties/rental-passive-apartment.ts:67](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L67)

projects when you can sell this property using [purchaseDate](RentalPassiveApartment.md#purchasedate) and [minSellYears](RentalPassiveApartment.md#minsellyears)

##### Returns

`Date`

---

### rawEstimatedAnnualCashFlow

#### Get Signature

> **get** **rawEstimatedAnnualCashFlow**(): `number`

Defined in: [properties/rental-passive-apartment.ts:153](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L153)

the estimated annual cashFlow return

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`rawEstimatedAnnualCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#rawestimatedannualcashflow)

---

### wasPurchased

#### Get Signature

> **get** **wasPurchased**(): `boolean`

Defined in: [properties/rental-passive-apartment.ts:87](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L87)

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`wasPurchased`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#waspurchased)

## Methods

### canInvestByUser()

> **canInvestByUser**(`user`, `date`, `properties`): [`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

Defined in: [properties/rental-passive-apartment.ts:97](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L97)

get a user, and other owned properties, to determine if a user can invest

#### Parameters

##### user

[`IUserInvestorCheck`](../../../account/i-user-investor-check/interfaces/IUserInvestorCheck.md)

##### date

`Date`

##### properties

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

#### Returns

[`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`canInvestByUser`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#caninvestbyuser)

---

### canSell()

> **canSell**(`today`): `boolean`

Defined in: [properties/rental-passive-apartment.ts:171](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L171)

looks at [isOwned](RentalPassiveApartment.md#isowned) and also compares dates to see if the property can sell;

#### Parameters

##### today

`Date`

#### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`canSell`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#cansell)

---

### clone()

> **clone**(): [`RentalPassiveApartment`](RentalPassiveApartment.md)

Defined in: [properties/rental-passive-apartment.ts:231](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L231)

make a copy

#### Returns

[`RentalPassiveApartment`](RentalPassiveApartment.md)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`clone`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#clone)

---

### getCashFlowByDate()

> **getCashFlowByDate**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:195](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L195)

should be for quarterly distributions, so last month of the quarter

#### Parameters

##### today

`Date`

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`getCashFlowByDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#getcashflowbydate)

---

### getEquityFromSell()

> **getEquityFromSell**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:179](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L179)

Determines the equity of a sale by date. Note: [soldDate](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#solddate) must be populated and today and it must match

#### Parameters

##### today

`Date`

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`getEquityFromSell`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#getequityfromsell)

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:211](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L211)

universal method to determine cash flow on a monthly basis

#### Parameters

##### today

`Date`

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`getEstimatedMonthlyCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#getestimatedmonthlycashflow)

---

### getExpensesByDate()

> **getExpensesByDate**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:224](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L224)

used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount

#### Parameters

##### today

`Date`

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`getExpensesByDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#getexpensesbydate)

---

### isAvailableByDate()

> **isAvailableByDate**(`today`): `boolean`

Defined in: [properties/rental-passive-apartment.ts:75](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L75)

used to compare [availableStartDate](RentalPassiveApartment.md#availablestartdate), [today](RentalPassiveApartment.md#today-5), and [availableEndDate](RentalPassiveApartment.md#availableenddate),

#### Parameters

##### today

`Date`

#### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`isAvailableByDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#isavailablebydate)

---

### sellPriceByDate()

> **sellPriceByDate**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:122](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/properties/rental-passive-apartment.ts#L122)

lame way to apply [sellPriceAppreciationPercent](RentalPassiveApartment.md#sellpriceappreciationpercent) to rolling over the years the property was owned and uses {investmentPercent}

#### Parameters

##### today

`Date`

#### Returns

`number`
