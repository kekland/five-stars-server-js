import { Model } from 'lapisdb'
import { NamedPositionWithTime } from './named.position.with.time';
import { VehicleType } from './vehicle_type';
import { CargoAssignRequestObject } from '../data/request/cargo.assign.request.object';
import { CargoInformation } from './information.model';
import { Dimensions, Properties } from './properties.model';
import { NamedPosition } from './named.position';
import { Route } from './route.model';

export interface ICargoData {
  departure: NamedPosition;
  departureTime: Date;
  arrival: NamedPosition;
  route: Route;
  properties: Properties;
  dimensions: Dimensions;
  information: CargoInformation;
  images: string[];
  expired: boolean;
  verified: boolean;
  owner: string;
}

export class Cargo extends Model<Cargo> {
  departure: NamedPosition;
  departureTime: Date;

  arrival: NamedPosition;
  route: Route;

  properties: Properties;
  dimensions: Dimensions;
  information: CargoInformation;

  images: string[];

  expired: boolean;
  verified: boolean;

  owner: string;

  constructor(data: ICargoData) {
    super()
    if (data == null) return;
    this.departure = data.departure
    this.departureTime = data.departureTime
    this.arrival = data.arrival
    this.route = data.route
    this.properties = data.properties
    this.dimensions = data.dimensions
    this.information = data.information
    this.images = data.images
    this.expired = data.expired
    this.verified = data.verified
    this.owner = data.owner
  }

  static fromAssignRequestObject(data: {body: CargoAssignRequestObject, route: Route, user: string}) {
    return new Cargo({
      departure: data.body.departure,
      departureTime: data.body.departureTime,
      arrival: data.body.arrival,
      route: data.route,
      images: data.body.images,
      dimensions: data.body.dimensions,
      information: data.body.information,
      properties: data.body.properties,
      expired: false,
      verified: false,
      owner: data.user,
    })
  }
}
