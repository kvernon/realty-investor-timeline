[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [caching/value-cache](../index.md) / ValueCache

# Class: ValueCache\<T\>

Defined in: [caching/value-cache.ts:34](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L34)

## Type Parameters

• **T**

## Implements

- [`IValueCache`](../interfaces/IValueCache.md)\<`T`\>

## Constructors

### new ValueCache()

> **new ValueCache**\<`T`\>(`expireDate`, `defaultValue`, `renewalInMonths`): [`ValueCache`](ValueCache.md)\<`T`\>

Defined in: [caching/value-cache.ts:56](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L56)

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

Defined in: [caching/value-cache.ts:106](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L106)

---

### renewalInMonths

> **renewalInMonths**: `number`

Defined in: [caching/value-cache.ts:35](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L35)

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`renewalInMonths`](../interfaces/IValueCache.md#renewalinmonths)

## Accessors

### expireDate

#### Get Signature

> **get** **expireDate**(): `Date`

Defined in: [caching/value-cache.ts:37](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L37)

##### Returns

`Date`

#### Set Signature

> **set** **expireDate**(`value`): `void`

Defined in: [caching/value-cache.ts:41](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L41)

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

Defined in: [caching/value-cache.ts:48](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L48)

##### Returns

`T`[]

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`newDefault`](../interfaces/IValueCache.md#newdefault)

## Methods

### getValue()

> **getValue**(`currentTime`): `T`[]

Defined in: [caching/value-cache.ts:76](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L76)

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

Defined in: [caching/value-cache.ts:94](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L94)

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

Defined in: [caching/value-cache.ts:63](https://github.com/kvernon/realty-investor-timeline/blob/604db9c08bd36b2a48c8b342796ed6cd0d1401e0/src/caching/value-cache.ts#L63)

#### Parameters

##### value

`T`[]

##### currentDate

`Date`

#### Returns

`void`

#### Implementation of

[`IValueCache`](../interfaces/IValueCache.md).[`setValue`](../interfaces/IValueCache.md#setvalue)
