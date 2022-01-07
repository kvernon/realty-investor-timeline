export type EnsureArrayPredicate<T> = (item: T, index?: number) => boolean;

export function ensureArray<T>(
  array?: T[],
  options?: { predicate?: EnsureArrayPredicate<T>; message?: string; ignoreError?: boolean }
): void {
  const message = 'array is invalid';
  const ignoreError = false;
  if (!options) {
    options = { message, ignoreError };
  }

  if (!options.message) {
    options.message = message;
  }

  if (!options.ignoreError) {
    options.ignoreError = ignoreError;
  }

  if (!array || (array.length === 0 && !options.ignoreError)) {
    throw new Error(options.message);
  }

  if (options.predicate && array.filter(options.predicate).length === 0 && !options.ignoreError) {
    throw new Error(options.message);
  }
}
