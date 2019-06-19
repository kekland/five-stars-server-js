import { Model } from 'lapisdb';
import { Name } from '../shared/name';
import { hashSync, genSaltSync, genSalt } from 'bcrypt'
import { AuthRegisterRequestObject } from '../../data/request/auth/auth.register.request.object';

export class User extends Model<User> {
  username: string;
  hashedPassword: string;

  email: string;
  phoneNumber: string;

  name: Name;
  organization: string;

  cargo: string[];
  vehicles: string[];

  favoriteCargo: string[];
  favoriteVehicles: string[];

  savedCargoData: string[];
  savedVehicleData: string[];

  constructor(data: {
    username: string, hashedPassword: string, email: string, phoneNumber: string, name: Name,
    cargo: string[], vehicles: string[], organization: string, favoriteCargo: string[], favoriteVehicles: string[],
    savedCargoData: string[], savedVehicleData: string[],
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
    this.favoriteCargo = data.favoriteCargo
    this.favoriteVehicles = data.favoriteVehicles
    this.savedCargoData = data.savedCargoData
    this.savedVehicleData = data.savedVehicleData
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
      favoriteCargo: [],
      favoriteVehicles: [],
      savedCargoData: [],
      savedVehicleData: [],
    });
  }
}
