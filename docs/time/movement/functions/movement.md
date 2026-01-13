[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [time/movement](../index.md) / movement

# Function: movement()

> **movement**(`options`, `user`): [`ITimeline`](../../timeline/interfaces/ITimeline.md)

Defined in: [time/movement.ts:21](https://github.com/kvernon/realty-investor-timeline/blob/6b35ed5cc421de617489a7f0ddd7f150a92f9d5b/src/time/movement.ts#L21)

This is where the magic happens. You provide the options, and you let this calculate the rest.
The flow is that you do work on a day, then after the changes are done for that day you evaluate it to determine if you met the goal or reached the end.
If you did not meet the goal you start a new day and try again.

## Parameters

### options

[`ILoopOptions`](../../i-loop-options/interfaces/ILoopOptions.md)

### user

[`IUser`](../../../account/user/interfaces/IUser.md)

## Returns

[`ITimeline`](../../timeline/interfaces/ITimeline.md)
