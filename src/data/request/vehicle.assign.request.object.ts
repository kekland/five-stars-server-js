import { NamedPositionWithTime } from '../../models/shared/named.position.with.time';
import { VehicleType } from '../../models/shared/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';
import { NamedPosition } from '../../models/shared/named.position';
import { Properties, Dimensions } from '../../models/shared/properties.model';
import { VehicleInformation } from '../../models/shared/information.model';

export class VehicleAssignRequestObject {
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
  @Type(() => VehicleInformation)
  information: VehicleInformation;

  @Validator.IsNotEmpty()
  @Validator.IsUrl({}, { each: true })
  images: string[];
}
