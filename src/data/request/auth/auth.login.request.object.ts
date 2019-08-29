import * as Validator from 'class-validator'

export class AuthLoginRequestObject {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  username: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  password: string;
}

export class AuthChangePasswordRequestObject {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(6)
  password: string;
}
