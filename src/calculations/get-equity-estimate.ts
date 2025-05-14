/**
 * returns {@link currency} formatted number result
 * @param sellPrice
 * @param costDown
 * @param equityCapturePercent
 */
export function getEquityEstimate(sellPrice: number, costDown: number, equityCapturePercent: number): number {
  if (equityCapturePercent === 0) {
    return 0;
  }

  if (sellPrice === 0) {
    return 0;
  }

  return (sellPrice - costDown) * (equityCapturePercent / 100);
}
