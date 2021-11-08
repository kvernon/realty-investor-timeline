import { IRentalPropertyEntity } from '../properties';
import { IHistoricalReason } from './i-historical-reason';

export interface IHistoricalProperty {
  property: IRentalPropertyEntity;
  reasons: IHistoricalReason[];
}
