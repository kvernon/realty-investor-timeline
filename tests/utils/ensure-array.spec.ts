import { ensureArray } from '../../src/utils/ensure';

describe('ensureArray unit tests', () => {
  describe('and has collection', () => {
    test('should pass', () => {
      expect(() => ensureArray(['str'])).not.toThrow();
    });

    test('should fail with custom', () => {
      expect(() => ensureArray([4], { predicate: (item) => item === 5 })).toThrow('array is invalid');
    });
  });

  describe('and no collection', () => {
    test('should fail', () => {
      expect(() => ensureArray()).toThrow();
    });

    test('should fail with message', () => {
      const message = 'hello';
      expect(() => ensureArray(null, { message })).toThrow(message);
    });
  });

  describe('and empty collection', () => {
    test('should pass', () => {
      expect(() => ensureArray([])).toThrow();
    });
  });
});
