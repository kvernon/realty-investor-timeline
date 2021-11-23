export type EnsureArrayPredicate<T> = (item: T, index?: number) => boolean;

export function ensureArray<T>(array?: T[], options?: { predicate?: EnsureArrayPredicate<T>; message?: string }): void {
  const message = 'array is invalid';
  if (!options) {
    options = { message };
  }

  if (!options.message) {
    options.message = message;
  }

  if (!array || array.length === 0) {
    throw new Error(options.message);
  }

  if (options.predicate && array.filter(options.predicate).length === 0) {
    throw new Error(options.message);
  }
}
