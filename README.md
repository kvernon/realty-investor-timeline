# realty-investor-timeline

[![CircleCI](https://circleci.com/gh/kvernon/realty-investor-timeline.svg?style=shield)](https://circleci.com/gh/kvernon/realty-investor-timeline) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com) ![](./badges/badge.svg)

A way to determine if and when your expenses would be covered through rental properties

Will be based on version 1

1. https://bitbucket.org/kellyvernon/realty-generator-core (a private repo by me).
2. version 1 live: http://cubedelement.com/realty/

## Inspiration

This was originally used as a discussion point between me and my SO. The idea is that we like our jobs, but we also want
a way to ensure that if anything happens to us, would we be able to sustain our income.

For me, I was inspired by a game originally from early 2000's where you could quickly click on houses and flip them, but
after this idea and speaking with mentors, the idea has become find an optimal way to _ramp-up_.

## What this does

As mentioned prior, we want to find a way to _ramp-up_. This library will show work through the scenarios of houses and
provide a way to collect them. Equally, it'll provide feedback as to why you passed on a property. For example, it could
be that you didn't have enough cash. Another is that you may have wanted more cash flow per month. After you see the
trends, and based on the time-line hand at play, you could realize that your ideas need to become a littler more broad.

The basics are that we do a loop that simulates a per-month advance. In there we take your money saved and determine if
you have enough to acquire more properties. Equally, we run through selling of properties too, because it's a common
practice.

## Building

### Node version

On linux, mac, etc... do: `$ nvm install`

on windows: `$ nvs install`

### Getting the Repo up and running

#### Install libs

`$ npm ci`

#### Run tests

`$ npm run tests`

> ⚠ This can run using Wallaby.js in automatic config, or you can use the config supplied here

### CI/CD (Delivery)

This project _sports_ a non gitflow workflow.

#### Branches

`Main` and `feature/*`

#### The (CI/CD) Flow

Once a feature's PR is merged, the pipeline will run checks and publish.

## Single family homes

### Features

- Mortgage calc ✔
- Rent amount ✔
- Cash flow ✔
- Equity (simple) ✔

### Needed things (in no order)

- TODO: Hard Money Loan calc ✋
  - What would the transition look like in code?
- TODO: Cash flow ramp (0 - 3 months depending on rehab, conventional, or existing tenant)
  - Transition would be around Hard Money vs Conventional
- TODO: delay 1st mortgage payment
- TODO: figure out 1031 exchange
- TODO: Determine how long to hold onto a property

## Missing features

1. publisher
2. user
3. apartments (passive investing)
4. ledger

## Future

- Refine the build process to remove /dist/src from library drill down
