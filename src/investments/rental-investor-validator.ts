import { UserInvestResult } from './user-invest-result';

export interface IRentalInvestorValidator {
  readonly canInvest: boolean;
  results: UserInvestResult[];
}

export class RentalInvestorValidator implements IRentalInvestorValidator {
  get canInvest(): boolean {
    return !this.results || this.results.length === 0;
  }

  results: UserInvestResult[] = [];
}
