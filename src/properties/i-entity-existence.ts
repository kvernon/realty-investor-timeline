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
