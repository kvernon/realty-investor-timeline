[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [properties/rental-single-family](../index.md) / RentalSingleFamily

# Class: RentalSingleFamily

Defined in: [properties/rental-single-family.ts:25](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L25)

## Implements

- [`IEntityExistence`](../../i-entity-existence/interfaces/IEntityExistence.md)
- [`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Constructors

### new RentalSingleFamily()

> **new RentalSingleFamily**(): [`RentalSingleFamily`](RentalSingleFamily.md)

#### Returns

[`RentalSingleFamily`](RentalSingleFamily.md)

## Properties

### \_soldDate

> **\_soldDate**: `Date`

Defined in: [properties/rental-single-family.ts:183](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L183)

the date this property was sold where you no longer receive investment cash

---

### address

> **address**: `string`

Defined in: [properties/rental-single-family.ts:36](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L36)

address of property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`address`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#address)

---

### availableEndDate

> **availableEndDate**: `Date`

Defined in: [properties/rental-single-family.ts:45](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L45)

date which property was removed from the timeline.. think of it like someone else purchased this property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`availableEndDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#availableenddate)

---

### availableStartDate

> **availableStartDate**: `Date`

Defined in: [properties/rental-single-family.ts:40](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L40)

date which property was generated or was available for purchase

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`availableStartDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#availablestartdate)

---

### cashDownPercent

> **cashDownPercent**: `number`

Defined in: [properties/rental-single-family.ts:110](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L110)

the percent down on the property xx out of 100, or 23% as an example

---

### equityCapturePercent

> **equityCapturePercent**: `number`

Defined in: [properties/rental-single-family.ts:147](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L147)

this can be between 10 - 20%

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`equityCapturePercent`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#equitycapturepercent)

---

### id

> **id**: `string`

Defined in: [properties/rental-single-family.ts:31](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L31)

unique identifier

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`id`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#id)

---

### minSellYears

> **minSellYears**: `number` = `0`

Defined in: [properties/rental-single-family.ts:202](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L202)

number of years to hold the property before being sold, default is 0. and this is used to calculated the [minSellDate](RentalSingleFamily.md#minselldate)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`minSellYears`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#minsellyears)

---

### monthlyPrincipalInterestTaxInterest

> **monthlyPrincipalInterestTaxInterest**: `number`

Defined in: [properties/rental-single-family.ts:105](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L105)

the project monthly payment

---

### propertyType

> `readonly` **propertyType**: [`PropertyType`](../../property-type/enumerations/PropertyType.md) = `PropertyType.SingleFamily`

Defined in: [properties/rental-single-family.ts:26](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L26)

used when evaluating rules

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`propertyType`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#propertytype)

---

### purchasePrice

> **purchasePrice**: `number`

Defined in: [properties/rental-single-family.ts:87](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L87)

At the time of purchase the ARV of the property

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`purchasePrice`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#purchaseprice)

---

### rawCashFlow

> **rawCashFlow**: `number`

Defined in: [properties/rental-single-family.ts:273](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L273)

the cashOnCash return

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`rawCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#rawcashflow)

---

### sellPriceAppreciationPercent

> **sellPriceAppreciationPercent**: `number` = `4`

Defined in: [properties/rental-single-family.ts:92](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L92)

the percent at which the property's value grows, for the US it spans from 4% (2019) to 14.5% (2021), this will default to 4

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`sellPriceAppreciationPercent`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#sellpriceappreciationpercent)

## Accessors

### costDownPrice

#### Get Signature

> **get** **costDownPrice**(): `number`

Defined in: [properties/rental-single-family.ts:116](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L116)

it's the purchase down

##### Returns

`number`

it's the purchase down

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`costDownPrice`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#costdownprice)

---

### estimatedCashOnCashReturn

#### Get Signature

> **get** **estimatedCashOnCashReturn**(): `number`

Defined in: [properties/rental-single-family.ts:291](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L291)

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`estimatedCashOnCashReturn`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#estimatedcashoncashreturn)

---

### estimatedReturnOnCapitalGain

#### Get Signature

> **get** **estimatedReturnOnCapitalGain**(): `number`

Defined in: [properties/rental-single-family.ts:299](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L299)

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`estimatedReturnOnCapitalGain`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#estimatedreturnoncapitalgain)

---

### isOwned

#### Get Signature

> **get** **isOwned**(): `boolean`

Defined in: [properties/rental-single-family.ts:59](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L59)

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`isOwned`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#isowned)

---

### minSellDate

#### Get Signature

> **get** **minSellDate**(): `Date`

Defined in: [properties/rental-single-family.ts:219](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L219)

projects when you can sell this property using [purchaseDate](RentalSingleFamily.md#purchasedate) and [minSellYears](RentalSingleFamily.md#minsellyears)

##### Returns

`Date`

---

### offeredInvestmentAmounts

#### Get Signature

> **get** **offeredInvestmentAmounts**(): `number`[]

Defined in: [properties/rental-single-family.ts:127](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L127)

a range of amounts that the user can invest for the property: typically this is the [costDownPrice](RentalSingleFamily.md#costdownprice)

##### Returns

`number`[]

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`offeredInvestmentAmounts`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#offeredinvestmentamounts)

---

### purchaseDate

#### Get Signature

> **get** **purchaseDate**(): `Date`

Defined in: [properties/rental-single-family.ts:176](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L176)

the date this property was acquired, and you receive investment cash

##### Returns

`Date`

#### Set Signature

> **set** **purchaseDate**(`value`): `void`

Defined in: [properties/rental-single-family.ts:169](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L169)

the date this property was acquired, and you receive investment cash

##### Parameters

###### value

`Date`

##### Returns

`void`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`purchaseDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#purchasedate)

---

### rawEstimatedAnnualCashFlow

#### Get Signature

> **get** **rawEstimatedAnnualCashFlow**(): `number`

Defined in: [properties/rental-single-family.ts:283](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L283)

the estimated annual cashFlow return

##### Returns

`number`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`rawEstimatedAnnualCashFlow`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#rawestimatedannualcashflow)

---

### soldDate

#### Get Signature

> **get** **soldDate**(): `Date`

Defined in: [properties/rental-single-family.ts:195](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L195)

the date this property was sold where you no longer receive investment cash

##### Returns

`Date`

#### Set Signature

> **set** **soldDate**(`value`): `void`

Defined in: [properties/rental-single-family.ts:188](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L188)

the date this property was sold where you no longer receive investment cash

##### Parameters

###### value

`Date`

##### Returns

`void`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`soldDate`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#solddate)

---

### wasPurchased

#### Get Signature

> **get** **wasPurchased**(): `boolean`

Defined in: [properties/rental-single-family.ts:66](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L66)

a check to see if the property was purchased

##### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`wasPurchased`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#waspurchased)

## Methods

### canInvestByUser()

> **canInvestByUser**(`user`, `date`, `properties`): [`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

Defined in: [properties/rental-single-family.ts:76](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L76)

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

Defined in: [properties/rental-single-family.ts:208](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L208)

looks at [isOwned](RentalSingleFamily.md#isowned) and also compares dates to see if the property can sell;

#### Parameters

##### today

`Date`

#### Returns

`boolean`

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`canSell`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#cansell)

---

### clone()

> **clone**(): [`RentalSingleFamily`](RentalSingleFamily.md)

Defined in: [properties/rental-single-family.ts:269](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L269)

make a copy

#### Returns

[`RentalSingleFamily`](RentalSingleFamily.md)

#### Implementation of

[`IRentalPropertyEntity`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md).[`clone`](../../i-rental-property-entity/interfaces/IRentalPropertyEntity.md#clone)

---

### getCashFlowByDate()

> **getCashFlowByDate**(`today`): `number`

Defined in: [properties/rental-single-family.ts:230](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L230)

1. you must have purchased this home
2. this home must not have been sold

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

Defined in: [properties/rental-single-family.ts:135](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L135)

Determines the equity of a sale by date. Note: [soldDate](RentalSingleFamily.md#solddate) must be populated and today and it must match

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

Defined in: [properties/rental-single-family.ts:246](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L246)

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

Defined in: [properties/rental-single-family.ts:254](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L254)

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

Defined in: [properties/rental-single-family.ts:51](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L51)

used to compare [availableStartDate](RentalSingleFamily.md#availablestartdate), [today](RentalSingleFamily.md#today-5), and [availableEndDate](RentalSingleFamily.md#availableenddate),

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

Defined in: [properties/rental-single-family.ts:98](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/properties/rental-single-family.ts#L98)

lame way to apply [sellPriceAppreciationPercent](RentalSingleFamily.md#sellpriceappreciationpercent) to rolling over the years the property was owned

#### Parameters

##### today

`Date`

#### Returns

`number`
