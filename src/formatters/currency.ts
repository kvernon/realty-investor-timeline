export default function (value: number): number {
  if (!value || value === 0) {
    return 0;
  }

  const c = value
    .toString()
    .split('.')
    .map((v, i) => (i % 2 !== 0 ? v.substr(0, 2) : v));
  return parseFloat(c.join('.'));
}
