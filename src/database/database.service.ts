import { Datastore, DatastoreManager } from 'lapisdb';
import { Cargo } from '../models/cargo/cargo.model';
import { Vehicle } from '../models/vehicle/vehicle.model';
import { User } from '../models/user/user.model';
import { LevelDbAdapter } from 'lapisdb-level-adapter'
import { VehicleDataSaved } from '../models/vehicle/vehicle.data.saved.model';
import { CargoDataSaved } from '../models/cargo/cargo.data.saved.model';

export class DatabaseService {
  static cargoStore: Datastore<Cargo>
  static cargoSavedStore: Datastore<CargoDataSaved>
  static vehicleStore: Datastore<Vehicle>
  static vehicleSavedStore: Datastore<VehicleDataSaved>
  static userStore: Datastore<User>

  static init = () => {
    DatabaseService.cargoStore = new Datastore<Cargo>('cargo', Cargo,
      new LevelDbAdapter(Cargo, { name: 'cargo', directory: './database' }))

    DatabaseService.cargoSavedStore = new Datastore<CargoDataSaved>('cargoDataSaved', CargoDataSaved,
      new LevelDbAdapter(CargoDataSaved, { name: 'cargoDataSaved', directory: './database' }))

    DatabaseService.vehicleStore = new Datastore<Vehicle>('vehicle', Vehicle,
      new LevelDbAdapter(Vehicle, { name: 'vehicle', directory: './database' }))

    DatabaseService.vehicleSavedStore = new Datastore<VehicleDataSaved>('vehicleDataSaved', VehicleDataSaved,
      new LevelDbAdapter(VehicleDataSaved, { name: 'vehicleDataSaved', directory: './database' }))

    DatabaseService.userStore = new Datastore<User>('user', User,
      new LevelDbAdapter(User, { name: 'user', directory: './database' }))

    DatastoreManager.initialize(
      DatabaseService.cargoStore,
      DatabaseService.vehicleStore,
      DatabaseService.userStore,
    )
  }
}
