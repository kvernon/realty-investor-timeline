/**
 * returns a percentage number (none float like) xx.xx%
 * @param costDown
 * @param purchasePrice
 */
export function getInvestmentPercent(costDown: number, purchasePrice: number): number {
  if (!costDown || !purchasePrice) {
    return 0;
  }
  return (costDown / purchasePrice) * 100;
}
