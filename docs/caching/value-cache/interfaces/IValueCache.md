[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [caching/value-cache](../index.md) / IValueCache

# Interface: IValueCache\<T\>

Defined in: [caching/value-cache.ts:11](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L11)

## Type Parameters

• **T**

## Properties

### expireDate

> **expireDate**: `Date`

Defined in: [caching/value-cache.ts:13](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L13)

---

### newDefault

> `readonly` **newDefault**: `unknown`

Defined in: [caching/value-cache.ts:14](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L14)

---

### renewalInMonths

> **renewalInMonths**: `number`

Defined in: [caching/value-cache.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L12)

## Methods

### getValue()

> **getValue**(`currentTime`): `T`[]

Defined in: [caching/value-cache.ts:22](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L22)

if the cache is expired, then it will return the default value. otherwise
it will return the stored value

#### Parameters

##### currentTime

`Date`

#### Returns

`T`[]

---

### isCacheExpired()

> **isCacheExpired**(`currentDate`?): `boolean`

Defined in: [caching/value-cache.ts:33](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L33)

determines if the expiredDate is greater than
or equal to currentDate. if this is the case it
will be return true. Also if expiredDate is nothing,
then it will return true. Also if currentDate is null,
while expiredDate exists then it will be expired, aka true

#### Parameters

##### currentDate?

`Date`

#### Returns

`boolean`

---

### setValue()

> **setValue**(`value`, `currentDate`): `void`

Defined in: [caching/value-cache.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/ea73199cb6880de4072be51a1e62a70c3db0502c/src/caching/value-cache.ts#L16)

#### Parameters

##### value

`T`[]

##### currentDate

`Date`

#### Returns

`void`
