[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [investments/user-invest-result](../index.md) / UserInvestResult

# Class: UserInvestResult

Defined in: [investments/user-invest-result.ts:9](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/investments/user-invest-result.ts#L9)

## Implements

- [`IUserInvestResult`](../interfaces/IUserInvestResult.md)

## Constructors

### new UserInvestResult()

> **new UserInvestResult**(`reason`, `message`, `properties`): [`UserInvestResult`](UserInvestResult.md)

Defined in: [investments/user-invest-result.ts:18](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/investments/user-invest-result.ts#L18)

#### Parameters

##### reason

[`InvestmentReasons`](../../investment-reasons/enumerations/InvestmentReasons.md) = `InvestmentReasons.Unknown`

##### message

`string`

##### properties

`object`[]

#### Returns

[`UserInvestResult`](UserInvestResult.md)

## Properties

### investmentReason

> **investmentReason**: [`InvestmentReasons`](../../investment-reasons/enumerations/InvestmentReasons.md)

Defined in: [investments/user-invest-result.ts:15](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/investments/user-invest-result.ts#L15)

#### Implementation of

[`IUserInvestResult`](../interfaces/IUserInvestResult.md).[`investmentReason`](../interfaces/IUserInvestResult.md#investmentreason)

---

### properties

> **properties**: `object`[]

Defined in: [investments/user-invest-result.ts:16](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/investments/user-invest-result.ts#L16)

#### name

> **name**: `string`

#### value

> **value**: `number`

#### Implementation of

[`IUserInvestResult`](../interfaces/IUserInvestResult.md).[`properties`](../interfaces/IUserInvestResult.md#properties)

## Accessors

### message

#### Get Signature

> **get** **message**(): `string`

Defined in: [investments/user-invest-result.ts:10](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/investments/user-invest-result.ts#L10)

##### Returns

`string`

#### Implementation of

[`IUserInvestResult`](../interfaces/IUserInvestResult.md).[`message`](../interfaces/IUserInvestResult.md#message)
