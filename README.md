# realty-investor-timeline

[![CircleCI](https://circleci.com/gh/kvernon/realty-investor-timeline.svg?style=shield)](https://circleci.com/gh/kvernon/realty-investor-timeline) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com) ![](./badges/badge.svg)

A way to determine if and when your expenses would be covered through rental properties

Will be based on version 1

1. https://bitbucket.org/kellyvernon/realty-generator-core (a private repo by me).
2. version 1 live: http://cubedelement.com/realty/

## Inspiration

This was originally used as a discussion point between me and my SO. The idea is that we like our jobs, but we also want
a way to ensure that if anything happens to us, we would be able to sustain our income.

For me, I was inspired by a game originally from early 2000's where you could quickly click on houses and flip them, but
after this idea and speaking with mentors, the idea has become find an optimal way to _ramp-up_.

> ☝️Mentors are great! They do a great job at helping you discover how to get to the next point in your life. Also, a
> mentor is someone who has done the thing and is either where you've been or want to go. AKA, don't ask a someone how
> to become a CEO when that person has never been a CEO. (Hopefully that give you a good idea)

## What this does

As mentioned prior, we want to find a way to _ramp-up_. This library will work through the scenarios of houses and
provide a way to collect them. Once it completes, it'll provide feedback as to why you passed on a property.

For example, it could be that you didn't have enough cash. Another is that you may have wanted more cash flow per month.
After you see the trends, and based on the time-line hand at play, you could realize that you might need to expand on
your ideal finds.

The library loop simulates a per-month savings. In there it will take your money saved and determine if you have enough
to acquire more properties. Equally, we run through selling of properties too, because it's a common practice.

## Building

### Node version

On linux, mac, etc... do: `$ nvm install`, referencing this manager: `https://github.com/nvm-sh/nvm`

on windows: `$ nvs install`, referencing this manager: `https://github.com/jasongin/nvs`

### Getting the Repo up and running

#### Install libs

`$ npm ci`

#### Run tests

`$ npm run tests`

> ☝️This can run using Wallaby.js in automatic config, or you can use the config supplied here

### CI/CD (Delivery)

This project _sports_ a non gitflow workflow.

#### Branches

`main` and `feature/*`

#### The (CI/CD) Flow

Once a feature's PR is merged, the pipeline will run checks and publish.

## Single family homes

### Features

- Mortgage calc ✔
- Rent amount ✔
- Cash flow ✔
- Appreciation calculation ✔
- Equity (simple) ✔
- Monthly summaries ✔
- Annual summaries ✔

### Needed things (in no order)

- TODO: Hard Money Loan calc ✋
  - What would the transition look like in code?
- TODO: Cash flow ramp (0 - 3 months depending on rehab, conventional, or existing tenant)
  - Transition would be around Hard Money vs Conventional
- TODO: delay 1st mortgage payment
- TODO: figure out 1031 exchange

## Missing features

1. apartments (passive investor)

## Future

- Refine the build process to remove /dist/src from library drill down

## calling

As this is still in progress, the current flow is as follows:

```typescript
import {
  HasMetGoalOrMaxTime,
  ISimulateOptions,
  LedgerCollection,
  LoanSettings,
  PropertyType,
  RentalGenerator,
  RentalSingleFamily,
  RuleEvaluation,
  PurchaseRuleTypes,
  ValueCache,
  User,
  simulate,
} from "@cubedelement.com/realty-investor-timeline";

const options: ISimulateOptions = {
  amountInSavings: 100000,
  monthlyIncomeAmountGoal: 10000,
  monthlySavedAmount: 10000,
  purchaseRules: [
    { value: 30000, type: PurchaseRuleTypes.maxEstimatedOutOfPocket },
    { value: 7000, type: PurchaseRuleTypes.minEstimatedCapitalGains },
    { value: 200, type: PurchaseRuleTypes.minEstimatedCashFlowPerMonth },
  ],
  loanSettings: [
    {
      propertyType: PropertyType.SingleFamily,
      name: LoanSettings.minimumReservesSingleFamily,
      value: 6,
    },
    {
      name: LoanSettings.loanRatePercent,
      value: 4,
      propertyType: PropertyType.SingleFamily,
    },
    {
      name: LoanSettings.loanTermInYears,
      value: 30,
      propertyType: PropertyType.SingleFamily,
    },
  ],
  maxYears: 1,
  maxRentalOpportunitiesSingleFamily: 4,
  highestMinSellInYears: 1,
  lowestMinSellInYears: 1,
  highestPriceDown: 200000,
  lowestPriceDown: 150000,
  highestSellAppreciationPercent: 7,
  lowestSellAppreciationPercent: 5,
  lowestCashFlowMonthly: 200,
  highestCashFlowMonthly: 500,
  lowestEquityCapturePercent: 7,
  highestEquityCapturePercent: 15,
};

const actual = simulate(options);

//Finally, to review your results, you can use the user's getSummariesAnnual.
const lastYear = actual.user.getSummariesAnnual(
  actual.endDate.getUTCFullYear()
);
```

The example result object models:
`ITimeline`:

```JSON
{
  "startDate": "2021-11-01T00:00:00.000Z",
  "endDate": "2022-11-01T00:00:00.000Z",
  "rentals": [
    {
      "property": {
        "sellPriceAppreciationPercent": 6,
        "minSellYears": 1,
        "id": "7674c1ec-2fb6-4828-9490-271e9ab4a3c4",
        "purchasePrice": 162373,
        "address": "1791 Wama Extension",
        "monthlyCashFlow": 237,
        "availableStartDate": "2021-12-01T00:00:00.000Z",
        "availableEndDate": "2022-02-01T00:00:00.000Z",
        "cashDownPercent": 25,
        "monthlyPrincipalInterestTaxInterest": 949.5723384565815,
        "_purchaseDate": "2022-01-01T06:00:00.000Z",
        "_soldDate": "2022-02-01T06:00:00.000Z"
      },
      "reasons": []
    }
  ],
  "user": {
    "ledgerCollection": {
      "collection": {
        "source": [
          {
            "amount": 119603.25,
            "type": "Equity Capture",
            "created": "2022-11-01T00:00:00.000Z",
            "note": "for: 1791 Wama Extension, id: 7674c1ec-2fb6-4828-9490-271e9ab4a3c4"
          }
        ]
      }
    }
  }
}
```
