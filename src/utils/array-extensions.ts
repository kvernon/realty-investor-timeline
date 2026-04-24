declare global {
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
    isEmpty(): boolean;
  }
}

Array.prototype.first = function <T>(this: T[]): T | undefined {
  return this[0];
};

Array.prototype.last = function <T>(this: T[]): T | undefined {
  return this.length > 0 ? this[this.length - 1] : undefined;
};

Array.prototype.isEmpty = function <T>(this: T[]): boolean {
  return this.length === 0;
};

export {};
