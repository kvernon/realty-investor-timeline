import '../../src/utils/array-extensions';

describe('array-extensions unit tests', () => {
  describe('first', () => {
    describe('and empty array', () => {
      test('should return undefined', () => {
        expect([].first()).toBeUndefined();
      });
    });

    describe('and single item', () => {
      test('should return the item', () => {
        expect([42].first()).toBe(42);
      });
    });

    describe('and multiple items', () => {
      test('should return the first item', () => {
        expect([1, 2, 3].first()).toBe(1);
      });
    });
  });

  describe('last', () => {
    describe('and empty array', () => {
      test('should return undefined', () => {
        expect([].last()).toBeUndefined();
      });
    });

    describe('and single item', () => {
      test('should return the item', () => {
        expect([42].last()).toBe(42);
      });
    });

    describe('and multiple items', () => {
      test('should return the last item', () => {
        expect([1, 2, 3].last()).toBe(3);
      });
    });
  });

  describe('isEmpty', () => {
    describe('and empty array', () => {
      test('should return true', () => {
        expect([].isEmpty()).toBe(true);
      });
    });

    describe('and single item', () => {
      test('should return false', () => {
        expect([42].isEmpty()).toBe(false);
      });
    });

    describe('and multiple items', () => {
      test('should return false', () => {
        expect([1, 2, 3].isEmpty()).toBe(false);
      });
    });
  });
});
