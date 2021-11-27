import { genericGenerateProperty } from './generic-generate-property';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { ILoanSetting } from '../loans/i-loan-settings';
import { LoanSettings } from '../loans/loan-settings';
import { PropertyType } from '../properties/property-type';
import { IEntityExistence } from '../properties/i-entity-existence';
import { RentalSingleFamily } from '../properties/rental-single-family';
import { getMonthlyPrincipalInterestTaxInterest } from '../calculations/get-monthly-principal-interest-tax-interest';
import { GenerateProperty } from './generate-property';

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
  closingCostPercent: number
): RentalSingleFamily => {
  const rental = genericGenerateProperty<RentalSingleFamily>(RentalSingleFamily, options, lifeTime);

  const cashDownPercentForSingleFamilyHome = 25;

  rental.cashDownPercent = cashDownPercentForSingleFamilyHome;
  const singleFamilySettings = settings.filter((x) => x.propertyType === PropertyType.SingleFamily);

  if (!settings || !singleFamilySettings) {
    throw new Error('no settings found');
  }

  rental.monthlyPrincipalInterestTaxInterest = getMonthlyPrincipalInterestTaxInterest(
    rental.purchasePrice,
    rental.cashDownPercent,
    closingCostPercent,
    singleFamilySettings.find((x) => x.name === LoanSettings.LoanRatePercent)?.value || 5,
    singleFamilySettings.find((x) => x.name === LoanSettings.LoanTermInYears)?.value || 30
  );

  return rental;
};
