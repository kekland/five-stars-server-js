import { Model } from 'lapisdb';
import { Name } from './name';
import { hashSync, genSaltSync, genSalt } from 'bcrypt'
import { AuthRegisterRequestObject } from '../data/request/auth.register.request.object';

export class User extends Model<User> {
  username: string;
  hashedPassword: string;

  email: string;
  phoneNumber: string;

  name: Name;
  organization: string;

  cargo: string[];
  vehicles: string[];

  constructor(data: {
    username: string, hashedPassword: string, email: string, phoneNumber: string, name: Name,
    cargo: string[], vehicles: string[], organization: string,
  }) {
    super()
    if (data == null) return;
    this.username = data.username
    this.hashedPassword = data.hashedPassword
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.organization = data.organization
    this.name = data.name
    this.cargo = data.cargo
    this.vehicles = data.vehicles
  }

  static fromAuthRegisterRequestObject(data: AuthRegisterRequestObject) {
    return new User({
      username: data.username,
      hashedPassword: hashSync(data.password, genSaltSync(10)),
      email: data.email,
      name: data.name,
      organization: data.organization,
      phoneNumber: data.phoneNumber,
      cargo: [],
      vehicles: [],
    });
  }
}
