export interface IHistoricalReason {
  reason: string;
  date: Date;
  additionalInfo: { name: string; value: number }[];
}
