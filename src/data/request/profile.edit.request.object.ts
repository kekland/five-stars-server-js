import { Name } from '../../models/shared/name';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';

export class ProfileEditRequestObject {
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
