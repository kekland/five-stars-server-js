import * as Validator from 'class-validator'

export class AuthAvailabilityRequestObject {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  username: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  email: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  phoneNumber: string;
}
