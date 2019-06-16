import * as Validator from 'class-validator';
export class Bounded {
  @Validator.IsNumber()
  lower: number;

  @Validator.IsNumber()
  upper: number;

  doesFit(value: number): boolean {
    return (this.lower <= value && value <= this.upper);
  }
}
