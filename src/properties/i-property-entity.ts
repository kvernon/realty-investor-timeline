import { IEntityExistence } from './i-entity-existence';
import { PropertyType } from './property-type';

export interface IPropertyEntity extends IEntityExistence {
  /**
   * unique identifier
   */
  id: string;

  /**
   * address of property
   */
  address: string;

  /**
   * purchase price of the property (may or may not be after repair value, ARV)
   */
  purchasePrice: number;

  /**
   * it's the purchase down
   */
  costDownPrice: number;

  offeredInvestmentAmounts: number[];

  /**
   * the percent at which the property's value grows
   */
  sellPriceAppreciationPercent: number;

  /**
   * number of years to hold the property before being sold
   */
  minSellYears?: number;

  /**
   * the cashOnCash return
   */
  rawCashFlow: number;

  /**
   * the estimated annual cashFlow return
   */
  get rawEstimatedAnnualCashFlow(): number;

  /**
   * this can be between 10 - 20%
   */
  equityCapturePercent: number;

  /**
   * used when evaluating rules
   */
  propertyType: PropertyType;
}
