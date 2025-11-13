import { ITimeline, Timeline } from './timeline';
import { defaultHasMetGoalOrMaxTime } from './default-has-met-goal-or-max-time';
import { IUser } from '../account/user';
import { cloneDateUtc } from '../utils/data-clone-date';
import { ensureArray } from '../utils/ensure';
import { ILoanSetting } from '../loans/i-loan-settings';
import { PropertyType } from '../properties/property-type';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { ILoopOptions } from './i-loop-options';
import { looper } from './looper';

/**
 * This is where the magic happens. You provide the options, and you let this calculate the rest.
 * The flow is that you do work on a day, then after the changes are done for that day you evaluate it to determine if you met the goal or reached the end.
 * If you did not meet the goal you start a new day and try again.
 * @param options
 * @param user
 */
export function movement(options: ILoopOptions, user: IUser): ITimeline {
  if (!options.hasMetGoalOrMaxTime) {
    options.hasMetGoalOrMaxTime = defaultHasMetGoalOrMaxTime;
  }

  if (!options.maxYears) {
    options.maxYears = 10;
  }

  if (!options.startDate) {
    const setupDate = new Date();
    options.startDate = cloneDateUtc(setupDate);
  }

  if (!options.propertyGeneratorPassiveApartment && !options.propertyGeneratorSingleFamily) {
    throw new Error('Invalid Argument: must declare at least 1, either propertyGeneratorSingleFamily or propertyGeneratorPassiveApartment');
  }

  ensureArray<ILoanSetting>(user.loanSettings, {
    predicate: (item) => item.propertyType === PropertyType.SingleFamily,
    message: 'no single family loan settings for user: loanSettings',
    ignoreError: !options.propertyGeneratorSingleFamily && !!options.propertyGeneratorPassiveApartment,
  });
  ensureArray<IRuleEvaluation<PurchaseRuleTypes>>(user.purchaseRules, {
    predicate: (item) => item.propertyType !== PropertyType.None,
    message: 'no single family or passive apartment purchase rules for user: purchaseRules',
  });
  ensureArray<IRuleEvaluation<HoldRuleTypes>>(user.holdRules, {
    predicate: (item) => item.propertyType === PropertyType.SingleFamily,
    message: 'no single family hold rules for user: holdRules',
    ignoreError: !options.propertyGeneratorSingleFamily && !!options.propertyGeneratorPassiveApartment,
  });

  let result: ITimeline = new Timeline(cloneDateUtc(options.startDate), cloneDateUtc(options.startDate), [], user.clone());

  do {
    result = looper(options, result);
  } while (
    !options.hasMetGoalOrMaxTime(
      result.startDate,
      cloneDateUtc(result.user.ledgerCollection.getLatestLedgerItem().created),
      result.user,
      options.maxYears,
    )
  );

  if (result.user.ledgerCollection.getLatestLedgerItem()) {
    result.endDate = cloneDateUtc(result.user.ledgerCollection.getLatestLedgerItem().created);
  }

  return result;
}
