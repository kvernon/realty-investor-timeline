jest.mock('../../src/properties/rental-single-family');
jest.mock('../../src/properties/rental-passive-apartment');

import { IRentalGenerator } from '../../src/generators/rental-generator';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { PropertyType } from '../../src/properties/property-type';
import { IHistoricalProperty } from '../../src/time/i-historical-property';

describe('updateHistoricalRentals unit tests', () => {
  let rentalGeneratorHome: jest.Mocked<IRentalGenerator<RentalSingleFamily>>;

  beforeEach(() => {
    rentalGeneratorHome = {
      getRentals: jest.fn(),
      removeRentalById: jest.fn(),
    } as jest.Mocked<IRentalGenerator<RentalSingleFamily>>;
  });

  afterEach(() => {
    rentalGeneratorHome = null;

    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  describe('and updateHistoricalRentals unit test', () => {
    describe('and no existing rentals', () => {
      describe('and no new rentals', () => {
        test('should return collection', async () => {
          rentalGeneratorHome.getRentals.mockReturnValueOnce([]);

          const updateHistoricalRentals = (await import('../../src/time/update-historical-rentals')).updateHistoricalRentals;

          const expected: IHistoricalProperty[] = [];

          expect(updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, [], new Date(), [])).toEqual(expected);
        });

        describe('and new generated rentals', () => {
          test('should return collection', async () => {
            const singleFamily = new RentalSingleFamily();

            rentalGeneratorHome.getRentals.mockReturnValueOnce([singleFamily]);

            const updateHistoricalRentals = (await import('../../src/time/update-historical-rentals')).updateHistoricalRentals;

            const expected: IHistoricalProperty[] = [{ property: singleFamily, reasons: [] }];

            expect(updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, [], new Date(), [])).toEqual(expected);
          });
        });
      });
    });
    describe('and existing rentals', () => {
      let historical: IHistoricalProperty[];
      let singleFamily: jest.Mocked<RentalSingleFamily>;

      beforeEach(() => {
        singleFamily = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
        singleFamily.address = 'sf addy';
        singleFamily.id = 'sf-id';
        Object.defineProperty(singleFamily, 'propertyType', {
          value: PropertyType.SingleFamily,
        });

        singleFamily.clone.mockReturnThis();

        historical = [{ property: singleFamily, reasons: [] }];
      });

      describe('and no new rentals', () => {
        test('should return collection', async () => {
          rentalGeneratorHome.getRentals.mockReturnValueOnce([]);

          const updateHistoricalRentals = (await import('../../src/time/update-historical-rentals')).updateHistoricalRentals;

          expect(updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, historical, new Date(), [])).toEqual(historical);
        });

        describe('and new generated rentals', () => {
          test('should return collection', async () => {
            const newRental = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
            newRental.address = 'new sf addy';
            newRental.id = 'new sf-id';
            Object.defineProperty(newRental, 'propertyType', {
              value: PropertyType.SingleFamily,
            });
            newRental.clone.mockReturnThis();

            rentalGeneratorHome.getRentals.mockReturnValueOnce([newRental]);

            const updateHistoricalRentals = (await import('../../src/time/update-historical-rentals')).updateHistoricalRentals;

            const expected: IHistoricalProperty[] = historical.concat([{ property: newRental, reasons: [] }]);

            expect(updateHistoricalRentals(RentalSingleFamily, rentalGeneratorHome, historical, new Date(), [])).toEqual(expected);
          });
        });
      });
    });
  });
});
