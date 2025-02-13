[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/update-historical-rentals](../index.md) / updateHistoricalRentals

# Function: updateHistoricalRentals()

> **updateHistoricalRentals**\<`TRental`\>(`type`, `propertyGenerator`, `timelineProperties`, `today`, `loanSettings`): [`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

Defined in: [time/update-historical-rentals.ts:7](https://github.com/kvernon/realty-investor-timeline/blob/d14161e46dc540b751017ae4b2cfca53cbab658c/src/time/update-historical-rentals.ts#L7)

## Type Parameters

• **TRental** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Parameters

### type

() => `TRental`

### propertyGenerator

[`IRentalGenerator`](../../../generators/rental-generator/interfaces/IRentalGenerator.md)\<`TRental`\>

### timelineProperties

[`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]

### today

`Date`

### loanSettings

[`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

## Returns

[`IHistoricalProperty`](../../i-historical-property/interfaces/IHistoricalProperty.md)[]
