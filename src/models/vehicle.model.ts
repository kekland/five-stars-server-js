import { Model } from 'lapisdb'
import { VehicleType } from './vehicle_type';
import { NamedPosition } from './named.position';
import { Route } from './cargo.model';

export class Vehicle extends Model<Vehicle> {
  departure: NamedPosition;
  arrival: NamedPosition;
  route: Route;

  weight: number;
  volume: number;
  description: string;
  images: string[];

  vehicleType: VehicleType;

  ownerId: string;
  expired: boolean;

  constructor(data: {
    departure: NamedPosition, arrival: NamedPosition, weight: number, route: Route,
    volume: number, description: string, images: string[], vehicleType: VehicleType, ownerId: string, expired: boolean,
  }) {
    super()
    this.departure = data.departure
    this.arrival = data.arrival
    this.route = data.route
    this.weight = data.weight
    this.volume = data.volume
    this.description = data.description
    this.images = data.images
    this.vehicleType = data.vehicleType
    this.ownerId = data.ownerId
    this.expired = data.expired
  }
}
