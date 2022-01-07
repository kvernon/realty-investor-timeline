import { IEntityExistence, IPropertyEntity } from '../properties';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { ILoanSetting } from '../loans';

export type GenerateProperty<T extends IPropertyEntity> = (
  options: IPropertyEntityOptions,
  lifeTime: IEntityExistence,
  userSettings: ILoanSetting[],
  closingCostPercent: number
) => T;
