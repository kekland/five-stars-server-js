import { Model } from 'lapisdb'
import { NamedPositionWithTime } from './named.position.with.time';
import { VehicleType } from './vehicle_type';

export class Cargo extends Model<Cargo> {
  departure: NamedPositionWithTime;
  arrival: NamedPositionWithTime;

  weight: number;
  volume: number;
  price: number;
  description: string;
  images: string[];

  vehicleType: VehicleType;

  ownerId: string;

  constructor(data: {
    departure: NamedPositionWithTime, arrival: NamedPositionWithTime, weight: number,
    volume: number, price: number, description: string, images: string[], vehicleType: VehicleType, ownerId: string,
  }) {
    super()
    if (data == null) return;
    this.departure = data.departure
    this.arrival = data.arrival
    this.weight = data.weight
    this.volume = data.volume
    this.price = data.price
    this.vehicleType = data.vehicleType
    this.description = data.description
    this.images = data.images
    this.ownerId = data.ownerId
  }
}
