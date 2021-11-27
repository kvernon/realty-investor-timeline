export function randomNumberBetween(start: number, end: number): number {
  if (start === end) {
    return start;
  }

  const diff = end - start;
  return Math.floor(Math.random() * diff + start);
}
