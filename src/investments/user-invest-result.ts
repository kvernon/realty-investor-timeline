import { InvestmentReasons } from './investment-reasons';

export interface IUserInvestResult {
  message: string;
  investmentReason: InvestmentReasons;
}

export class UserInvestResult implements IUserInvestResult {
  get message(): string {
    const theMessage = this._message ? ` ${this._message}` : '';
    return `${InvestmentReasons[this.investmentReason]}${theMessage}`;
  }

  public investmentReason: InvestmentReasons;

  constructor(reason: InvestmentReasons = InvestmentReasons.Unknown, message = '') {
    this.investmentReason = reason;
    this._message = message;
  }

  private readonly _message: string;
}
