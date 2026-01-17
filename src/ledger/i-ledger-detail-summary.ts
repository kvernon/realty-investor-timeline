export interface ILedgerDetailSummary {
  date: Date;

  /**
   * the total monetary amount in the ledger for a length of time
   */
  balance: number;

  /**
   * a total amount of monetary flow for a length of time
   */
  cashFlow: number;

  /**
   * a average amount of monetary flow for a length of time
   */
  averageCashFlow: number;

  /**
   * represents the total monetary used to acquire purchases of a property or properties for a length of time
   */
  purchases: number;

  /**
   * represents the total monetary acquired after the sale of a property or properties for a length of time
   */
  equity: number;
  /**
   * a way to determine the average monthly monetary flow using the quarterly totals
   */
  averageQuarterlyCashFlow: number;
}
