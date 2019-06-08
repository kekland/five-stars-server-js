import { Model } from 'lapisdb'
import { NamedPositionWithTime } from './named.position.with.time';
import { VehicleType } from './vehicle_type';
import { CargoAssignRequestObject } from '../data/request/cargo.assign.request.object';

export class Route {
  polyline: string;
  distance: number;

  constructor(data: {polyline: string, distance: number}) {
    this.polyline = data.polyline
    this.distance = data.distance
  }
}

export class Cargo extends Model<Cargo> {
  departure: NamedPositionWithTime;
  arrival: NamedPositionWithTime;
  route: Route;

  weight: number;
  volume: number;
  price: number;
  description: string;
  images: string[];

  vehicleType: VehicleType;

  ownerId: string;
  expired: boolean;

  constructor(data: {
    departure: NamedPositionWithTime, arrival: NamedPositionWithTime, weight: number, route: Route,
    volume: number, price: number, description: string, images: string[], vehicleType: VehicleType, ownerId: string,
    expired: boolean,
  }) {
    super()
    if (data == null) return;
    this.departure = data.departure
    this.route = data.route
    this.arrival = data.arrival
    this.weight = data.weight
    this.volume = data.volume
    this.price = data.price
    this.vehicleType = data.vehicleType
    this.description = data.description
    this.images = data.images
    this.ownerId = data.ownerId
    this.expired = data.expired
  }

  static fromAssignRequestObject(data: CargoAssignRequestObject, route: Route, user: string) {
    return new Cargo({
      arrival: data.arrival,
      departure: data.departure,
      description: data.description,
      route,
      images: data.images,
      ownerId: user,
      price: data.price,
      vehicleType: data.vehicleType,
      volume: data.volume,
      weight: data.weight,
      expired: false,
    })
  }
}
