export interface IEntityExistence {
  /**
   * date which property was generated or was available for purchase
   */
  availableStartDate: Date;
  /**
   * date which property was removed from the timeline.. think of it like someone else purchased this property
   */
  availableEndDate: Date;

  /**
   * used to compare {@link availableStartDate}, {@param today}, and {@link availableEndDate},
   * @param today
   */
  isAvailableByDate(today: Date): boolean;
}
