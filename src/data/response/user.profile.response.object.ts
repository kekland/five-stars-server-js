import { Name } from '../../models/shared/name';
import { IObjectMetadata } from 'lapisdb/dist/database/model/model';
import { User } from '../../models/user/user.model';

export class UserProfileResponseObject {
  meta: IObjectMetadata;
  username: string;
  email: string;
  phoneNumber: string;
  organization: string;
  name: Name;
  cargo: string[];
  vehicles: string[];

  constructor(data: User) {
    this.meta = data.meta
    this.username = data.username
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.organization = data.organization
    this.name = data.name
    this.cargo = data.cargo
    this.vehicles = data.vehicles
  }
}
