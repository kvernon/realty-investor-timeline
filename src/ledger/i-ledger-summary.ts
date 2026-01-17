export interface ILedgerSummary {
  date: Date;
  balance: number;
  cashFlow: number;
  averageCashFlow: number;
  purchases: number;
  equity: number;
}

export interface ILedgerDetailSummary extends ILedgerSummary {
  /**
   * a way to determine the average monthly cash flow using the quarterly totals
   */
  averageQuarterlyCashFlow: number;
}
