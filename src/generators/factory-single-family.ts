import { RentalSingleFamily } from '../properties/rental-single-family';
import { genericGenerateProperty } from './generic-generate-property';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { getMonthlyPrincipalInterestTaxInterest } from '../properties/calculations';
import { IEntityExistence, IPropertyEntity } from '../properties/i-property-entity';
import { ILoanSetting } from '../account/i-loan-settings';
import { PropertyType } from '../account/property-type';
import { LoanSettings } from '../account/loan-settings';

export type GenerateProperty<T extends IPropertyEntity> = (
  options: IPropertyEntityOptions,
  lifeTime: IEntityExistence,
  userSettings: ILoanSetting[],
  closingCostPercent?: number
) => T;

/**
 * used to provide exclusive info for generating a {@link RentalSingleFamily}
 * @param options
 * @param lifeTime
 * @param settings
 * @param closingCostPercent
 */
export const generateSingleFamily: GenerateProperty<RentalSingleFamily> = (
  options: IPropertyEntityOptions,
  lifeTime: IEntityExistence,
  settings: ILoanSetting[],
  closingCostPercent?: number
): RentalSingleFamily => {
  const rental = genericGenerateProperty<RentalSingleFamily>(RentalSingleFamily, options, lifeTime);

  const singleFamilySettings = settings.filter((x) => x.propertyType === PropertyType.SingleFamily);

  if (!settings || !singleFamilySettings) {
    throw new Error('no settings found');
  }

  rental.monthlyPrincipalInterestTaxInterest = getMonthlyPrincipalInterestTaxInterest(
    rental.purchasePrice,
    rental.cashDownPercent,
    closingCostPercent,
    singleFamilySettings.find((x) => x.name === LoanSettings.loanRatePercent)?.value || 5,
    singleFamilySettings.find((x) => x.name === LoanSettings.loanTermInYears)?.value || 30
  );

  return rental;
};
