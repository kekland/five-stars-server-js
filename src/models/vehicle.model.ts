import { Model } from 'lapisdb'
import { VehicleType } from './vehicle_type';
import { NamedPosition } from './named.position';

export class Vehicle extends Model<Vehicle> {
  departure: NamedPosition;
  arrival: NamedPosition;

  weight: number;
  volume: number;
  description: string;
  images: string[];

  vehicleType: VehicleType;

  ownerId: string;

  constructor(data: {
    departure: NamedPosition, arrival: NamedPosition, weight: number,
    volume: number, description: string, images: string[], vehicleType: VehicleType, ownerId: string,
  }) {
    super()
    this.departure = data.departure
    this.arrival = data.arrival
    this.weight = data.weight
    this.vehicleType = data.vehicleType
    this.description = data.description
    this.images = data.images
    this.ownerId = data.ownerId
  }
}
