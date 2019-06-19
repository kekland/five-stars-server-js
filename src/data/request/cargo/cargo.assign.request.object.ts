import { NamedPositionWithTime } from '../../../models/shared/named.position.with.time';
import { VehicleType } from '../../../models/shared/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';
import { CargoInformation } from '../../../models/shared/information.model';
import { Dimensions, Properties } from '../../../models/shared/properties.model';
import { NamedPosition } from '../../../models/shared/named.position';

export class CargoAssignRequestObject {
  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => NamedPosition)
  departure: NamedPosition;

  @Validator.IsNotEmpty()
  @Validator.IsDate()
  @Type(() => Date)
  departureTime: Date;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => NamedPosition)
  arrival: NamedPosition;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => Properties)
  properties: Properties;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => Dimensions)
  dimensions: Dimensions;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => CargoInformation)
  information: CargoInformation;

  @Validator.IsNotEmpty()
  @Validator.IsUrl({}, { each: true })
  images: string[];
}
