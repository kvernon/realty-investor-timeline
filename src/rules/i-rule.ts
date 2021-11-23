import { PropertyType } from '../account/property-type';

export interface IRule<E> {
  type: E;
  value: number;
  propertyType: PropertyType;
}
