import { NamedPosition } from './named.position';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';

export class NamedPositionWithTime {
  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => NamedPosition)
  position: NamedPosition;

  @Validator.IsNotEmpty()
  @Validator.IsDate()
  @Type(() => Date)
  time: Date;

  constructor(data: { position: NamedPosition, time: Date }) {
    if (data == null) return;
    this.position = data.position
    this.time = data.time
  }
}
