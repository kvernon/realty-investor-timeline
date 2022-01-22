import { IRentalGenerator } from '../generators/rental-generator';
import { RentalPassiveApartment } from '../properties/rental-passive-apartment';
import { RentalSingleFamily } from '../properties/rental-single-family';

export interface ILoopRecursiveOptions {
  /**
   * How the system generates single family properties
   */
  propertyGeneratorSingleFamily?: IRentalGenerator<RentalSingleFamily>;

  /**
   * How the system generates passive apartment properties
   */
  propertyGeneratorPassiveApartment?: IRentalGenerator<RentalPassiveApartment>;
}
