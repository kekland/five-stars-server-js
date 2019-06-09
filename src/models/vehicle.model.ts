import { Model } from 'lapisdb'
import { VehicleType } from './vehicle_type';
import { NamedPosition } from './named.position';
import { Route } from './cargo.model';
import { VehicleAssignRequestObject } from '../data/request/vehicle.assign.request.object';

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
    if (data == null) return;
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

  static fromAssignRequestObject(data: VehicleAssignRequestObject, route: Route, user: string) {
    return new Vehicle({
      arrival: data.arrival,
      departure: data.departure,
      description: data.description,
      route,
      images: data.images,
      ownerId: user,
      vehicleType: data.vehicleType,
      volume: data.volume,
      weight: data.weight,
      expired: false,
    })
  }
}
