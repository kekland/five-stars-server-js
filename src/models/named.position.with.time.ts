import { NamedPosition } from './named.position';
import * as Validator from 'class-validator'

export class NamedPositionWithTime {
  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  position: NamedPosition;

  @Validator.IsDate()
  time: Date;

  constructor(data: {position: NamedPosition, time: Date}) {
    this.position = data.position
    this.time = data.time
  }
}
