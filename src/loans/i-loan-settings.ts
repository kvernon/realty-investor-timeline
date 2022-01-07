import { PropertyType } from '../properties/property-type';
import { LoanSettings } from './loan-settings';

export interface ILoanSetting {
  propertyType: PropertyType;
  name: LoanSettings;
  value: number;
}
