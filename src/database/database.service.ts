import { Datastore } from 'lapisdb';
import { Cargo } from '../models/cargo/cargo.model';
import { Vehicle } from '../models/vehicle/vehicle.model';
import { User } from '../models/user/user.model';

export class DatabaseService {
  static cargoStore: Datastore<Cargo>
  static vehicleStore: Datastore<Vehicle>
  static userStore: Datastore<User>

  static init = () => {
    DatabaseService.cargoStore = new Datastore<Cargo>('cargo', './database', () => Cargo)
    DatabaseService.vehicleStore = new Datastore<Vehicle>('vehicle', './database', () => Vehicle)
    DatabaseService.userStore = new Datastore<User>('user', './database', () => User)
  }
}
