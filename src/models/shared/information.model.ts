import * as Validator from 'class-validator'
import { VehicleType } from './vehicle_type';

export class VehicleInformation {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  model: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  description: string;

  @Validator.IsNotEmpty()
  @Validator.IsEnum(VehicleType)
  vehicleType: VehicleType;
}

export class CargoInformation {
  @Validator.IsNotEmpty()
  @Validator.IsBoolean()
  dangerous: boolean;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  description: string;

  @Validator.IsNotEmpty()
  @Validator.IsEnum(VehicleType)
  vehicleType: VehicleType;
}
