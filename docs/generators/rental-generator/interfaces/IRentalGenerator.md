[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [generators/rental-generator](../index.md) / IRentalGenerator

# Interface: IRentalGenerator\<T\>

Defined in: [generators/rental-generator.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L8)

## Type Parameters

• **T** _extends_ [`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

## Methods

### getRentals()

> **getRentals**(`rentalClassType`, `today`, `settings`?): `T`[]

Defined in: [generators/rental-generator.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L9)

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

> **removeRentalById**(`id`, `rentalClassType`, `today`?): `void`

Defined in: [generators/rental-generator.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/c7446a8a5576468ac5874a2dd8323180fa97a55b/src/generators/rental-generator.ts#L11)

#### Parameters

##### id

`string`

##### rentalClassType

() => `T`

##### today?

`Date`

#### Returns

`void`
