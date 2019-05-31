import * as Validator from 'class-validator'

export class Name {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1)
  first: string;

  @Validator.ValidateIf((_, v) => v != null)
  @Validator.IsString()
  @Validator.Length(1)
  middle?: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1)
  last: string;

  constructor(data: { first: string, middle?: string, last: string }) {
    if (data == null) return;
    this.first = data.first
    this.middle = data.middle
    this.last = data.last
  }
}
