import { EvalType } from './eval-type';

export const NoMoreThan: EvalType = (dataValue: number, goalValue: number): boolean => dataValue <= goalValue;

export const AtLeastOrMore: EvalType = (dataValue: number, goalValue: number): boolean => dataValue >= goalValue;
