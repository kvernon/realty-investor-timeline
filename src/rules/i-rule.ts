import { PropertyType } from '../properties/property-type';

export interface IRule<E> {
  type: E;
  value: number;
  propertyType: PropertyType;
}
