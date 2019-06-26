import { IsNotEmpty, IsBoolean } from 'class-validator';

export class SetVerifiedRequestObject {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
