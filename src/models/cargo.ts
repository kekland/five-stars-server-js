import { Model } from 'lapisdb'
import { PositionTime } from './position_time';
import { VehicleType } from './vehicle_type';

export class Cargo extends Model<Cargo> {
  departure: PositionTime;
  arrival: PositionTime;

  weight: number;
  volume: number;
  price: number;
  description: string;
  images: string[];

  vehicleType: VehicleType;

  ownerId: string;

  constructor(data: {
    departure: PositionTime, arrival: PositionTime, weight: number,
    volume: number, price: number, description: string, images: string[], vehicleType: VehicleType, ownerId: string,
  }) {
    super()
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
