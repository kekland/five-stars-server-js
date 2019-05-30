import * as Validator from 'class-validator';

export class NamedPosition {
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.Min(-90.0)
  @Validator.Max(90.0)
  latitude: number;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  @Validator.Min(-180.0)
  @Validator.Max(180.0)
  longitude: number;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2)
  name: string;

  constructor(data: { latitude: number, longitude: number, name: string }) {
    if (data == null) return;
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.name = data.name
  }
}
