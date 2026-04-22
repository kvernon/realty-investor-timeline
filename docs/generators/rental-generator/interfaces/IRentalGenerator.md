[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [generators/rental-generator](../index.md) / IRentalGenerator

# Interface: IRentalGenerator\<T\>

Defined in: [generators/rental-generator.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/generators/rental-generator.ts#L8)

## Type Parameters

### T

`T` _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Methods

### getRentals()

> **getRentals**(`rentalClassType`, `today`, `settings?`): `T`[]

Defined in: [generators/rental-generator.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/generators/rental-generator.ts#L9)

#### Parameters

##### rentalClassType

() => `T`

##### today

`Date`

##### settings?

[`ILoanSetting`](../../../loans/i-loan-settings/interfaces/ILoanSetting.md)[]

#### Returns

`T`[]

---

### removeRentalById()

> **removeRentalById**(`id`, `rentalClassType`, `today?`): `void`

Defined in: [generators/rental-generator.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/c883ed2ab8d97e7321be517c12415c9f4188e959/src/generators/rental-generator.ts#L11)

#### Parameters

##### id

`string`

##### rentalClassType

() => `T`

##### today?

`Date`

#### Returns

`void`
