import { Name } from '../../../models/shared/name';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';

export class AuthRegisterRequestObject {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(6)
  username: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(6)
  password: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsEmail()
  email: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsPhoneNumber(null)
  phoneNumber: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2)
  organization: string;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => Name)
  name: Name;
}
