import { Datastore } from 'lapisdb';
import { Cargo } from '../models/cargo';
import { Vehicle } from '../models/vehicle';

class DatabaseService {
  static cargoStore: Datastore<Cargo>
  static vehicleStore: Datastore<Vehicle>

  static init = () => {
    DatabaseService.cargoStore = new Datastore<Cargo>('cargo', './database', () => Cargo)
    DatabaseService.vehicleStore = new Datastore<Vehicle>('vehicle', './database', () => Vehicle)
  }
}
