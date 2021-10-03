import { IPropertyEntity } from '../properties';
import { IHistoricalReason } from './i-historical-reason';

export interface IHistoricalProperty {
  property: IPropertyEntity;
  reasons: IHistoricalReason[];
}
