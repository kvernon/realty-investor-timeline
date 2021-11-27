import { genericGenerateProperty } from './generic-generate-property';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { ILoanSetting } from '../loans/i-loan-settings';
import { IEntityExistence } from '../properties/i-entity-existence';
import { RentalPassiveApartment } from '../properties/rental-passive-apartment';
import { GenerateProperty } from './generate-property';

/**
 * used to provide exclusive info for generating a {@link RentalPassiveApartment}
 * @param options
 * @param lifeTime
 */
export const generateRentalPassiveApartment: GenerateProperty<RentalPassiveApartment> = (
  options: IPropertyEntityOptions,
  lifeTime: IEntityExistence,
  _settings: ILoanSetting[],
  _closingCostPercent: number
): RentalPassiveApartment => {
  const rentalPassiveApartment = genericGenerateProperty<RentalPassiveApartment>(
    RentalPassiveApartment,
    options,
    lifeTime
  );

  rentalPassiveApartment.offeredInvestmentAmounts = [50000, 100000, 150000, 200000, 250000, 500000].filter((e) => {
    const highestAmountWithLoanAndClosingCostsAndRepairs = rentalPassiveApartment.purchasePrice / 3.333;
    return e <= highestAmountWithLoanAndClosingCostsAndRepairs;
  });

  return rentalPassiveApartment;
};
