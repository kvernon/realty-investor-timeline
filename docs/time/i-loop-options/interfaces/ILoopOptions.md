[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/i-loop-options](../index.md) / ILoopOptions

# Interface: ILoopOptions

Defined in: [time/i-loop-options.ts:4](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/i-loop-options.ts#L4)

## Extends

- [`ILoopRecursiveOptions`](../../i-loop-recursive-options/interfaces/ILoopRecursiveOptions.md)

## Properties

### hasMetGoalOrMaxTime?

> `optional` **hasMetGoalOrMaxTime**: [`HasMetGoalOrMaxTime`](../../has-met-goal-or-max-time/type-aliases/HasMetGoalOrMaxTime.md)

Defined in: [time/i-loop-options.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/i-loop-options.ts#L18)

This is how the system knows when to quit. If no value is supplied, it will use `defaultHasMetGoalOrMaxTime`.

---

### maxYears?

> `optional` **maxYears**: `number`

Defined in: [time/i-loop-options.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/i-loop-options.ts#L13)

how long should this run in years? A common number is 25 to 30 years before giving up.

---

### propertyGeneratorPassiveApartment?

> `optional` **propertyGeneratorPassiveApartment**: [`IRentalGenerator`](../../../generators/rental-generator/interfaces/IRentalGenerator.md)\<[`RentalPassiveApartment`](../../../properties/rental-passive-apartment/classes/RentalPassiveApartment.md)\>

Defined in: [time/i-loop-recursive-options.ts:14](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/i-loop-recursive-options.ts#L14)

How the system generates passive apartment properties

#### Inherited from

[`ILoopRecursiveOptions`](../../i-loop-recursive-options/interfaces/ILoopRecursiveOptions.md).[`propertyGeneratorPassiveApartment`](../../i-loop-recursive-options/interfaces/ILoopRecursiveOptions.md#propertygeneratorpassiveapartment)

---

### propertyGeneratorSingleFamily?

> `optional` **propertyGeneratorSingleFamily**: [`IRentalGenerator`](../../../generators/rental-generator/interfaces/IRentalGenerator.md)\<[`RentalSingleFamily`](../../../properties/rental-single-family/classes/RentalSingleFamily.md)\>

Defined in: [time/i-loop-recursive-options.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/i-loop-recursive-options.ts#L9)

How the system generates single family properties

#### Inherited from

[`ILoopRecursiveOptions`](../../i-loop-recursive-options/interfaces/ILoopRecursiveOptions.md).[`propertyGeneratorSingleFamily`](../../i-loop-recursive-options/interfaces/ILoopRecursiveOptions.md#propertygeneratorsinglefamily)

---

### startDate?

> `optional` **startDate**: `Date`

Defined in: [time/i-loop-options.ts:8](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/time/i-loop-options.ts#L8)

when does this start?
