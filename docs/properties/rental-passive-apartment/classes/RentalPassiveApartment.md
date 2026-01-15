[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/rental-passive-apartment](../index.md) / RentalPassiveApartment

# Class: RentalPassiveApartment

Defined in: [properties/rental-passive-apartment.ts:22](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L22)

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

Defined in: [properties/rental-passive-apartment.ts:40](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L40)

address of property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`address`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#address)

---

### availableEndDate

> **availableEndDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:49](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L49)

date which property was removed from the timeline.. think of it like someone else purchased this property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`availableEndDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#availableenddate)

---

### availableStartDate

> **availableStartDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:44](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L44)

date which property was generated or was available for purchase

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`availableStartDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#availablestartdate)

---

### costDownPrice

> **costDownPrice**: `number`

Defined in: [properties/rental-passive-apartment.ts:127](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L127)

this will be the passive's contribution, which is the full chunk from one of the values for [offeredInvestmentAmounts](RentalPassiveApartment.md#offeredinvestmentamounts)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`costDownPrice`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#costdownprice)

---

### equityCapturePercent

> **equityCapturePercent**: `number`

Defined in: [properties/rental-passive-apartment.ts:132](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L132)

while we have equity capture in this example, know that cap rate is what determines true value.

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`equityCapturePercent`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#equitycapturepercent)

---

### id

> **id**: `string`

Defined in: [properties/rental-passive-apartment.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L35)

unique identifier

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`id`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#id)

---

### minSellYears

> **minSellYears**: `number`

Defined in: [properties/rental-passive-apartment.ts:54](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L54)

number of years to hold the property before being sold, default is 0. and this is used to calculated the [minSellDate](RentalPassiveApartment.md#minselldate)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`minSellYears`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#minsellyears)

---

### offeredInvestmentAmounts

> **offeredInvestmentAmounts**: `number`[]

Defined in: [properties/rental-passive-apartment.ts:30](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L30)

a range of amounts that the user can invest for the property: typically these are $25,000, $50,000, $100,000, or $200,000

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`offeredInvestmentAmounts`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#offeredinvestmentamounts)

---

### propertyType

> `readonly` **propertyType**: [`PropertyType`](../../property-type/enumerations/PropertyType.md) = `PropertyType.PassiveApartment`

Defined in: [properties/rental-passive-apartment.ts:23](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L23)

used when evaluating rules

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`propertyType`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#propertytype)

---

### purchaseDate

> **purchaseDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:145](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L145)

The date the property was acquired

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`purchaseDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#purchasedate)

---

### purchasePrice

> **purchasePrice**: `number`

Defined in: [properties/rental-passive-apartment.ts:100](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L100)

At the time of purchase the ARV of the property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`purchasePrice`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#purchaseprice)

---

### rawCashFlow

> **rawCashFlow**: `number`

Defined in: [properties/rental-passive-apartment.ts:134](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L134)

the cashOnCash return

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`rawCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#rawcashflow)

---

### sellPriceAppreciationPercent

> **sellPriceAppreciationPercent**: `number` = `4`

Defined in: [properties/rental-passive-apartment.ts:105](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L105)

we know appreciation is incorrect for apartments, they use a cap rate

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`sellPriceAppreciationPercent`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#sellpriceappreciationpercent)

---

### soldDate

> **soldDate**: `Date`

Defined in: [properties/rental-passive-apartment.ts:150](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L150)

The date the property was sold

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`soldDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#solddate)

## Accessors

### estimatedCashOnCashReturn

#### Get Signature

> **get** **estimatedCashOnCashReturn**(): `number`

Defined in: [properties/rental-passive-apartment.ts:240](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L240)

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`estimatedCashOnCashReturn`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#estimatedcashoncashreturn)

---

### estimatedReturnOnCapitalGain

#### Get Signature

> **get** **estimatedReturnOnCapitalGain**(): `number`

Defined in: [properties/rental-passive-apartment.ts:245](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L245)

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`estimatedReturnOnCapitalGain`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#estimatedreturnoncapitalgain)

---

### investmentPercent

#### Get Signature

> **get** **investmentPercent**(): `number`

Defined in: [properties/rental-passive-apartment.ts:110](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L110)

is a percentage number of xx.xx format

##### Returns

`number`

---

### isAvailable

#### Get Signature

> **get** **isAvailable**(): `boolean`

Defined in: [properties/rental-passive-apartment.ts:83](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L83)

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`isAvailable`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#isavailable)

---

### isOwned

#### Get Signature

> **get** **isOwned**(): `boolean`

Defined in: [properties/rental-passive-apartment.ts:75](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L75)

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`isOwned`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#isowned)

---

### minSellDate

#### Get Signature

> **get** **minSellDate**(): `Date`

Defined in: [properties/rental-passive-apartment.ts:59](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L59)

projects when you can sell this property using [purchaseDate](RentalPassiveApartment.md#purchasedate) and [minSellYears](RentalPassiveApartment.md#minsellyears)

##### Returns

`Date`

---

### rawEstimatedAnnualCashFlow

#### Get Signature

> **get** **rawEstimatedAnnualCashFlow**(): `number`

Defined in: [properties/rental-passive-apartment.ts:138](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L138)

the estimated annual cashFlow return

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`rawEstimatedAnnualCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#rawestimatedannualcashflow)

---

### wasPurchased

#### Get Signature

> **get** **wasPurchased**(): `boolean`

Defined in: [properties/rental-passive-apartment.ts:79](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L79)

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`wasPurchased`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#waspurchased)

## Methods

### canInvestByUser()

> **canInvestByUser**(`user`, `date`, `properties`): [`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

Defined in: [properties/rental-passive-apartment.ts:93](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L93)

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

Defined in: [properties/rental-passive-apartment.ts:156](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L156)

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

Defined in: [properties/rental-passive-apartment.ts:235](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L235)

make a copy

#### Returns

[`RentalPassiveApartment`](RentalPassiveApartment.md)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`clone`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#clone)

---

### getCashFlowByDate()

> **getCashFlowByDate**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:199](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L199)

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

Defined in: [properties/rental-passive-apartment.ts:168](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L168)

Determines the equity of a sale by date. Note: [soldDate](RentalPassiveApartment.md#solddate) must be populated and today and it must match

#### Parameters

##### today

`Date`

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`getEquityFromSell`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#getequityfromsell)

---

### getEstimatedEquityFromSell()

> **getEstimatedEquityFromSell**(`sellDate`, `purchaseDate`?): `number`

Defined in: [properties/rental-passive-apartment.ts:185](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L185)

used to show a predictive amount for the sell of the property

#### Parameters

##### sellDate

`Date`

used to represent the sell date of the property

##### purchaseDate?

`Date`

optional date

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`getEstimatedEquityFromSell`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#getestimatedequityfromsell)

---

### getEstimatedMonthlyCashFlow()

> **getEstimatedMonthlyCashFlow**(`today`): `number`

Defined in: [properties/rental-passive-apartment.ts:215](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L215)

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

Defined in: [properties/rental-passive-apartment.ts:228](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L228)

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

Defined in: [properties/rental-passive-apartment.ts:67](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L67)

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

Defined in: [properties/rental-passive-apartment.ts:118](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/properties/rental-passive-apartment.ts#L118)

lame way to apply [sellPriceAppreciationPercent](RentalPassiveApartment.md#sellpriceappreciationpercent) to rolling over the years the property was owned and uses {investmentPercent}

#### Parameters

##### today

`Date`

#### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`sellPriceByDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#sellpricebydate)
