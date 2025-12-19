import { InvestmentReasons } from './investment-reasons';

export interface IUserInvestResult {
  message: string;
  investmentReason: InvestmentReasons;
  properties: { name: string; value: number }[];
}

export class UserInvestResult implements IUserInvestResult {
  get message(): string {
    const theMessage = this._message ? ` ${this._message}` : '';
    return `${InvestmentReasons[this.investmentReason]}${theMessage}`;
  }

  public investmentReason: InvestmentReasons;
  public properties: { name: string; value: number }[];

  constructor(reason: InvestmentReasons = InvestmentReasons.Unknown, message: string, properties: { name: string; value: number }[]) {
    this.investmentReason = reason;
    this._message = message;
    this.properties = properties;
  }

  private readonly _message: string;
}
