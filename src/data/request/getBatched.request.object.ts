import { NamedPositionWithTime } from '../../models/shared/named.position.with.time';
import { VehicleType } from '../../models/shared/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';

export class GetBatchedRequestObject {
  @Validator.IsNotEmpty()
  @Validator.IsString({each: true})
  values: string[];
}
