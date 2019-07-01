import * as Validator from 'class-validator';

export class Properties {
  @Validator.IsPositive()
  weight: number;

  @Validator.IsPositive()
  volume: number;

  @Validator.ValidateIf((_, v) => v != null)
  price?: number;

  constructor(data: { price?: number, weight: number, volume: number }) {
    if (data == null) return;

    this.price = data.price
    this.weight = data.weight
    this.volume = data.volume
  }
}

export class Dimensions {
  @Validator.IsPositive()
  width: number;

  @Validator.IsPositive()
  height: number;

  @Validator.IsPositive()
  length: number;

  constructor(data: { width: number, height: number, length: number }) {
    if (data == null) return;

    this.width = data.width
    this.height = data.height
    this.length = data.length
  }
}
