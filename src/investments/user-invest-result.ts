import { InvestmentReasons } from './investment-reasons';

export class UserInvestResult {
  get message(): string {
    const theMessage = this._message ? ` ${this._message}` : '';
    return `${InvestmentReasons[this.investmentReason]}${theMessage}`;
  }

  public investmentReason: InvestmentReasons;
  public canInvest: boolean;

  constructor(canInvest: boolean, reason: InvestmentReasons = InvestmentReasons.Unknown, message = '') {
    this.investmentReason = reason;
    this.canInvest = canInvest;
    this._message = message;
  }

  private readonly _message: string;
}
