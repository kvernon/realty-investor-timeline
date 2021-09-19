import {
  getMonthlyPrincipalInterestTaxInterest,
  getMonthlyMortgage,
} from "../../src/single-family/calculations";

describe("calculations unit tests", () => {
  describe("and getMonthlyMortgage", () => {
    describe("and success", () => {
      test("and values", () => {
        const monthlyMortgage = getMonthlyMortgage(205000, 25, 6, 4.24);

        expect(monthlyMortgage).toBeGreaterThanOrEqual(755);
        expect(monthlyMortgage).toBeLessThanOrEqual(760);
      });
    });
  });
  describe("and getMonthlyPrincipalInterestTaxInterest", () => {
    describe("and success", () => {
      test("and values", () => {
        const monthlyMortgage = getMonthlyPrincipalInterestTaxInterest(
          205000,
          25,
          6,
          4.24
        );

        expect(monthlyMortgage).toBeGreaterThanOrEqual(1220);
        expect(monthlyMortgage).toBeLessThanOrEqual(1225);
      });
    });
  });
});
