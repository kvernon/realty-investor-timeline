import { IEntityExistence, IPropertyEntity } from '../properties';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { randomPropertyEntity } from '../utils';
import { ILoanSetting } from '../account/i-loan-settings';

/**
 * used to dynamically create a rental and hydrate it
 * @param rentalClassType
 * @param options
 * @param lifeTime
 */
export function genericGenerateProperty<T extends IPropertyEntity>(
  rentalClassType: new () => T,
  options: IPropertyEntityOptions,
  lifeTime: IEntityExistence
): T {
  if (!options) {
    throw new Error('options missing');
  }

  const createOptions = randomPropertyEntity(options);

  createOptions.availableStartDate = lifeTime.availableStartDate;

  createOptions.availableEndDate = lifeTime.availableEndDate;

  return <T>Object.assign(new rentalClassType(), createOptions);
}
