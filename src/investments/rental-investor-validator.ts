import { UserInvestResult } from './user-invest-result';

export interface IRentalInvestorValidator {
  readonly canInvest: boolean;
  results: UserInvestResult[];
}

export class RentalInvestorValidator implements IRentalInvestorValidator {
  get canInvest(): boolean {
    if (!this.results || this.results.length === 0) {
      return true;
    }

    return !this.results.some((x) => !x.canInvest);
  }

  results: UserInvestResult[] = [];
}
