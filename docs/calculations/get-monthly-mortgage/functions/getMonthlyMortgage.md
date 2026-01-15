[**@cubedelement.com/realty-investor-timeline**](../../../index.md)

---

[@cubedelement.com/realty-investor-timeline](../../../modules.md) / [calculations/get-monthly-mortgage](../index.md) / getMonthlyMortgage

# Function: getMonthlyMortgage()

> **getMonthlyMortgage**(`purchasePrice`, `cashDownPercent`, `closingCostPercent`, `loanRatePercent`, `loanTermInYears`): `number`

Defined in: [calculations/get-monthly-mortgage.ts:12](https://github.com/kvernon/realty-investor-timeline/blob/f5e81c745c9712850008b994845a2db276e2111c/src/calculations/get-monthly-mortgage.ts#L12)

formula for M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].

## Parameters

### purchasePrice

`number`

### cashDownPercent

`number`

### closingCostPercent

`number`

### loanRatePercent

`number`

annual percentage rate of your loan, like 3.25%

### loanTermInYears

`number` = `30`

15 or 30 typically

## Returns

`number`
