import { Model, Reference } from 'lapisdb';
import { Name } from '../shared/name';
import { hashSync, genSaltSync, genSalt } from 'bcrypt'
import { AuthRegisterRequestObject } from '../../data/request/auth/auth.register.request.object';
import { CargoDataSaved } from '../cargo/cargo.data.saved.model';
import { VehicleDataSaved } from '../vehicle/vehicle.data.saved.model';
import { Vehicle } from '../vehicle/vehicle.model';
import { Cargo } from '../cargo/cargo.model';
import { Type } from 'class-transformer';

export class User extends Model<User> {
  username: string;
  hashedPassword: string;

  email: string;
  phoneNumber: string;

  name: Name;
  organization: string;

  @Type(() => Reference)
  cargo: Array<Reference<Cargo>>
  @Type(() => Reference)
  vehicles: Array<Reference<Vehicle>>

  @Type(() => Reference)
  favoriteCargo: Array<Reference<Cargo>>
  @Type(() => Reference)
  favoriteVehicles: Array<Reference<Vehicle>>

  @Type(() => Reference)
  savedCargoData: Array<Reference<CargoDataSaved>>
  @Type(() => Reference)
  savedVehicleData: Array<Reference<VehicleDataSaved>>

  verified: boolean;

  constructor(data: {
    username: string, hashedPassword: string, email: string, phoneNumber: string, name: Name,
    organization: string,
    cargo: Array<Reference<Cargo>>,
    vehicles: Array<Reference<Vehicle>>,
    favoriteCargo: Array<Reference<Cargo>>,
    favoriteVehicles: Array<Reference<Vehicle>>,
    savedCargoData: Array<Reference<CargoDataSaved>>,
    savedVehicleData: Array<Reference<VehicleDataSaved>>,
    verified: boolean,
  }) {
    super(User)
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
    this.verified = data.verified
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
      verified: false,
    });
  }
}
