export function randomNumberBetween(start: number, end: number): number {
  const diff = end - start;
  return Math.floor(Math.random() * diff + start);
}
