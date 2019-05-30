import { NamedPositionWithTime } from '../../models/named.position.with.time';
import { VehicleType } from '../../models/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';

export class CargoAssignRequestObject {
  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => NamedPositionWithTime)
  departure: NamedPositionWithTime;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => NamedPositionWithTime)
  arrival: NamedPositionWithTime;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  weight: number;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  volume: number;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.IsPositive()
  price: number;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  description: string;

  @Validator.IsNotEmpty()
  @Validator.IsUrl({}, {each: true})
  images: string[];

  @Validator.IsNotEmpty()
  @Validator.IsEnum(VehicleType)
  vehicleType: VehicleType;
}
