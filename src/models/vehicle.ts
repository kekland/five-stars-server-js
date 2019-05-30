import { Model } from 'lapisdb'
import { PositionTime } from './position_time';
import { VehicleType } from './vehicle_type';

export class Vehicle extends Model<Vehicle> {
  departure: Position;
  arrival: Position;

  weight: number;
  volume: number;
  description: string;
  images: string[];

  vehicleType: VehicleType;

  ownerId: string;

  constructor(data: {
    departure: Position, arrival: Position, weight: number,
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
