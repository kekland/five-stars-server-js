import { Name } from '../../models/shared/name';
import { IModelMetadata } from 'lapisdb';
import { User } from '../../models/user/user.model';

export class UserProfileResponseObject {
  meta: IModelMetadata;
  username: string;
  email: string;
  phoneNumber: string;
  organization: string;
  name: Name;

  cargo: string[];
  vehicles: string[];

  favoriteCargo: string[];
  favoriteVehicles: string[];

  savedCargoData: string[];
  savedVehicleData: string[];

  verified: boolean;

  constructor(data: User) {
    this.meta = data.meta
    this.username = data.username
    this.email = data.email
    this.phoneNumber = data.phoneNumber
    this.organization = data.organization
    this.name = data.name
    this.cargo = data.cargo.map(v => v.id)
    this.vehicles = data.vehicles.map(v => v.id)
    this.favoriteCargo = data.favoriteCargo.map(v => v.id)
    this.favoriteVehicles = data.favoriteVehicles.map(v => v.id)
    this.savedCargoData = data.savedCargoData.map(v => v.id)
    this.savedVehicleData = data.savedVehicleData.map(v => v.id)
    this.verified = data.verified || false
  }
}
