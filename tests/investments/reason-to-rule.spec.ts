import { Chance } from 'chance';
import { InvestmentReasons } from '../../src/investments/investment-reasons';
import { ReasonToRule } from '../../src/investments/reason-to-rule';
import { PropertyType } from '../../src/properties/property-type';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';

describe('ReasonToRule unit tests', () => {
  let chance: Chance.Chance;
  let instance: ReasonToRule<RentalSingleFamily, HoldRuleTypes>;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
    instance = null;

    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  describe('and isRuleNone', () => {
    describe('and rule none', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()],
          HoldRuleTypes.None
        );

        expect(instance.isRuleNone()).toBeTruthy();
      });
    });
    describe('and rule undefined', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()]
        );

        expect(instance.isRuleNone()).toBeTruthy();
      });
    });
    describe('and not rule none', () => {
      test('should be false', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()],
          HoldRuleTypes.MinSellIfHighEquityPercent
        );

        expect(instance.isRuleNone()).toBeFalsy();
      });
    });
  });

  describe('and isRuleMatch', () => {
    describe('and rule none', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()],
          HoldRuleTypes.None
        );

        expect(instance.isRuleMatch(instance.ruleType)).toBeTruthy();
      });
    });
    describe('and rule undefined', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()]
        );

        expect(instance.isRuleMatch(instance.ruleType)).toBeTruthy();
      });
    });
    describe('and not rule none', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()],
          HoldRuleTypes.MinSellIfHighEquityPercent
        );

        expect(instance.isRuleMatch(instance.ruleType)).toBeTruthy();
      });

      describe('and rule not a match', () => {
        test('should be false', () => {
          instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            [chance.integer()],
            HoldRuleTypes.MinSellIfHighEquityPercent
          );

          expect(instance.isRuleMatch(HoldRuleTypes.MinSellInYears)).toBeFalsy();
        });
      });
    });
  });

  describe('and isRuleAndPropertyTypeMatch', () => {
    describe('and rule none', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()],
          HoldRuleTypes.None
        );

        expect(instance.isRuleAndPropertyTypeMatch(instance.propertyType, instance.ruleType)).toBeTruthy();
      });
    });
    describe('and rule undefined', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()]
        );

        expect(instance.isRuleAndPropertyTypeMatch(instance.propertyType, instance.ruleType)).toBeTruthy();
      });
    });
    describe('and not rule none', () => {
      test('should be true', () => {
        instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          [chance.integer()],
          HoldRuleTypes.MinSellIfHighEquityPercent
        );

        expect(instance.isRuleAndPropertyTypeMatch(instance.propertyType, instance.ruleType)).toBeTruthy();
      });

      describe('and rule not a match', () => {
        test('should be false', () => {
          instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            [chance.integer()],
            HoldRuleTypes.MinSellIfHighEquityPercent
          );

          expect(instance.isRuleAndPropertyTypeMatch(instance.propertyType, HoldRuleTypes.MinSellInYears)).toBeFalsy();
        });
      });

      describe('and propertyType not a match', () => {
        test('should be false', () => {
          instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            [chance.integer()],
            HoldRuleTypes.MinSellIfHighEquityPercent
          );

          expect(
            instance.isRuleAndPropertyTypeMatch(PropertyType.None, HoldRuleTypes.MinSellIfHighEquityPercent)
          ).toBeFalsy();
        });
      });
    });
  });

  describe('and isValueGreater', () => {
    beforeEach(() => {
      instance = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
        InvestmentReasons.Unknown,
        PropertyType.SingleFamily,
        'availableEndDate',
        [chance.integer({ min: 10, max: 30 })],
        HoldRuleTypes.None
      );
    });

    describe('and same', () => {
      test('should be false', () => {
        const ruleToCompare = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
          InvestmentReasons.Unknown,
          PropertyType.SingleFamily,
          'availableEndDate',
          instance.values,
          HoldRuleTypes.None
        );

        expect(instance.isValueGreater(ruleToCompare)).toBeFalsy();
      });
    });

    describe('and same size array', () => {
      describe('and instance value smaller', () => {
        test('should be false', () => {
          const ruleToCompare = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            instance.values.map((x) => x + 2),
            HoldRuleTypes.None
          );

          expect(instance.isValueGreater(ruleToCompare)).toBeFalsy();
        });
      });
      describe('and instance value larger', () => {
        test('should be true', () => {
          const ruleToCompare = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            instance.values.map((x) => x - 1),
            HoldRuleTypes.None
          );

          expect(instance.isValueGreater(ruleToCompare)).toBeTruthy();
        });
      });

      describe('and instance has more', () => {
        test('should be true', () => {
          const ruleToCompare = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            [...instance.values],
            HoldRuleTypes.None
          );

          instance.values.push(8);
          expect(instance.isValueGreater(ruleToCompare)).toBeTruthy();
        });
      });
      describe('and compared has more', () => {
        test('should be falsy', () => {
          const ruleToCompare = new ReasonToRule<RentalSingleFamily, HoldRuleTypes>(
            InvestmentReasons.Unknown,
            PropertyType.SingleFamily,
            'availableEndDate',
            instance.values.concat([2]),
            HoldRuleTypes.None
          );

          expect(instance.isValueGreater(ruleToCompare)).toBeFalsy();
        });
      });
    });
  });
});
