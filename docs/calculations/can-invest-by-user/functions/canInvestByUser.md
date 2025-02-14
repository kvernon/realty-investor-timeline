[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [calculations/can-invest-by-user](../index.md) / canInvestByUser

# Function: canInvestByUser()

> **canInvestByUser**(`rental`, `user`, `date`, `properties`): [`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)

Defined in: [calculations/can-invest-by-user.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/806c805529d356deb12c125749ddea89a26850dd/src/calculations/can-invest-by-user.ts#L16)

determines if a user can invest in a property.

## Parameters

### rental

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)

### user

[`IUserInvestorCheck`](../../../account/i-user-investor-check/interfaces/IUserInvestorCheck.md)

### date

`Date`

### properties

[`IRentalPropertyEntity`](../../../properties/i-rental-property-entity/interfaces/IRentalPropertyEntity.md)[]

## Returns

[`IRentalInvestorValidator`](../../../investments/rental-investor-validator/interfaces/IRentalInvestorValidator.md)
