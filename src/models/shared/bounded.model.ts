import * as Validator from 'class-validator';
export class Bounded<T> {
  lower: T;
  upper: T;

  doesFit(value: T): boolean {
    return (this.lower <= value && value <= this.upper);
  }
}
