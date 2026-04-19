import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { IRentalGenerator } from '../generators/rental-generator';
import { IHistoricalProperty } from './i-historical-property';
import cloneDeep from 'lodash.clonedeep';
import { ILoanSetting } from '../loans/i-loan-settings';
import { IHistoricalReason } from './i-historical-reason';

export function updateHistoricalRentals<TRental extends IRentalPropertyEntity>(
  type: new () => TRental,
  propertyGenerator: IRentalGenerator<TRental>,
  timelineProperties: IHistoricalProperty[],
  today: Date,
  loanSettings: ILoanSetting[],
): IHistoricalProperty[] {
  let result = (timelineProperties || []).map((x) => {
    return {
      reasons: cloneDeep(x.reasons),
      property: x.property.clone(),
    };
  });

  if (!propertyGenerator) {
    return result;
  }

  if (result.filter((x) => x.property instanceof type).length === 0) {
    result = result.concat(
      propertyGenerator.getRentals(type, today, loanSettings).map((rental) => ({
        property: rental,
        reasons: [] as IHistoricalReason[],
      })),
    );
  } else {
    propertyGenerator.getRentals(type, today, loanSettings).forEach((rental) => {
      if (!result.some((historicalProps) => historicalProps.property.id === rental.id)) {
        result.push({
          property: rental,
          reasons: [] as IHistoricalReason[],
        });
      }
    });
  }

  return result;
}
