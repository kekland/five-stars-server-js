import { Model } from 'lapisdb';
import { Name } from './name';

export class User extends Model<User> {
  username: string;
  hashedPassword: string;

  email: string;
  phoneNumber: string;

  name: Name;

  cargo: string[];
  vehicles: string[];

  constructor(data: {
    username: string, hashedPassword: string, email: string, phoneNumber: string, name: Name,
    cargo: string[], vehicles: string[],
  }) {
    super()
    if (data == null) return;
    this.username = data.username
    this.hashedPassword = data.hashedPassword
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.name = data.name
    this.cargo = data.cargo
    this.vehicles = data.vehicles
  }
}
