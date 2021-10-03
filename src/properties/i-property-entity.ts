export interface IEntityExistence {
  /**
   * date which property was generated or was available for purchase
   */
  availableStartDate: Date;
  /**
   * date which property was removed from the timeline.. think of it like someone else purchased this property
   */
  availableEndDate: Date;
}

export interface IPropertyEntity {
  /**
   * unique identifier
   */
  id: string;

  /**
   * address of property
   */
  address: string;

  /**
   * date which property was generated or was available for purchase
   */
  availableStartDate: Date;
  /**
   * date which property was removed from the timeline.. think of it like someone else purchased this property
   */
  availableEndDate: Date;

  /**
   * purchase price of the property (may or may not be after repair value, ARV)
   */
  purchasePrice: number;

  /**
   * the percent at which the property's value grows
   */
  sellPriceAppreciationPercent: number;

  /**
   * number of years to hold the property before being sold
   */
  minSellYears?: number;
}
