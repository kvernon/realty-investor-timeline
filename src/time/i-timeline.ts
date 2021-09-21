import { IPropertyEntity } from '../single-family/i-property-entity';

export interface IHistoricalReason {
  reason: string;
  date: Date;
}

export interface IHistoricalProperty {
  property: IPropertyEntity;
  reasons: IHistoricalReason[];
}

export interface ITimeline {
  startDate: Date;
  endDate: Date;
  rentals: IHistoricalProperty[];
}

/**
 * What's the lightest timeline model?
 *
 * 1. start date
 * 2. end date
 * 3. collection of all properties that were in rotation
 *    a. would need to updated available dates
 *    b. would need to update purchase dates
 *    c. would need to update sold dates
 *
 *
 *
 */