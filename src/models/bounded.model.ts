import * as Validator from 'class-validator';
export class Bounded {
  @Validator.IsNumber()
  lower: number;

  @Validator.IsNumber()
  upper: number;
}
