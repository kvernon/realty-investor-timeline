import { cloneDateUtc } from '../../src/utils/data-clone-date';

describe('data-clone-date', () => {
  test('should clone date object correctly', () => {
    const date = new Date(Date.UTC(2026, 0, 1));
    const utc = new Date(Date.parse(new Date(2026, 0, 1, 13, 1, 22).toUTCString()));

    const actual = cloneDateUtc(utc);
    expect(actual).toEqual(date);
  });
});
