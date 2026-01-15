[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [caching/value-cache](../index.md) / ValueCache

# Class: ValueCache\<T\>

Defined in: [caching/value-cache.ts:36](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L36)

## Type Parameters

• **T**

## Implements

- [`IValueCache`](../interfaces/IValueCache.md)\<`T`\>

## Constructors

### new ValueCache()

> **new ValueCache**\<`T`\>(`expireDate`, `defaultValue`, `renewalInMonths`): [`ValueCache`](ValueCache.md)\<`T`\>

Defined in: [caching/value-cache.ts:58](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L58)

#### Parameters

##### expireDate

`Date`

##### defaultValue

`T`[]

##### renewalInMonths

`number`

#### Returns

[`ValueCache`](ValueCache.md)\<`T`\>

## Properties

### \_value

> `protected` **\_value**: `T`[]

Defined in: [caching/value-cache.ts:108](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L108)

---

### renewalInMonths

> **renewalInMonths**: `number`

Defined in: [caching/value-cache.ts:37](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L37)

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`renewalInMonths`](../interfaces/IValueCache.md#renewalinmonths)

## Accessors

### expireDate

#### Get Signature

> **get** **expireDate**(): `Date`

Defined in: [caching/value-cache.ts:39](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L39)

##### Returns

`Date`

#### Set Signature

> **set** **expireDate**(`value`): `void`

Defined in: [caching/value-cache.ts:43](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L43)

##### Parameters

###### value

`Date`

##### Returns

`void`

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`expireDate`](../interfaces/IValueCache.md#expiredate)

---

### newDefault

#### Get Signature

> **get** **newDefault**(): `T`[]

Defined in: [caching/value-cache.ts:50](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L50)

##### Returns

`T`[]

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`newDefault`](../interfaces/IValueCache.md#newdefault)

## Methods

### getValue()

> **getValue**(`currentTime`): `T`[]

Defined in: [caching/value-cache.ts:78](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L78)

if the cache is expired, then it will return the default value. otherwise
it will return the stored value

#### Parameters

##### currentTime

`Date`

#### Returns

`T`[]

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`getValue`](../interfaces/IValueCache.md#getvalue)

---

### isCacheExpired()

> **isCacheExpired**(`currentDate`?): `boolean`

Defined in: [caching/value-cache.ts:96](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L96)

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

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`isCacheExpired`](../interfaces/IValueCache.md#iscacheexpired)

---

### setValue()

> **setValue**(`value`, `currentDate`): `void`

Defined in: [caching/value-cache.ts:65](https://github.com/kvernon/realty-investor-timeline/blob/a8ee0dbe1cb2541838a433a27053b4875ab05305/src/caching/value-cache.ts#L65)

#### Parameters

##### value

`T`[]

##### currentDate

`Date`

#### Returns

`void`

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`setValue`](../interfaces/IValueCache.md#setvalue)
