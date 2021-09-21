export interface IUserGoal {
  monthlyIncomeAmountGoal: number;

  metMonthlyGoal(today: Date): boolean;
}
