import { Model, Reference } from 'lapisdb'
import { NamedPosition } from '../shared/named.position';
import { Properties, Dimensions } from '../shared/properties.model';
import { VehicleInformation } from '../shared/information.model';
import { Route } from '../shared/route.model';
import { VehicleAssignRequestObject } from '../../data/request/vehicle/vehicle.assign.request.object';
import { User } from '../user/user.model';
import { Type } from 'class-transformer';

export interface IVehicleData {
  departure: NamedPosition;
  departureTime: Date;
  arrival: NamedPosition;
  route: Route;
  properties: Properties;
  dimensions: Dimensions;
  information: VehicleInformation;
  images: string[];
  archived: boolean;
  verified: boolean;
  owner: Reference<User>;
}

export class Vehicle extends Model<Vehicle> {
  departure: NamedPosition;
  departureTime: Date;

  arrival: NamedPosition;
  route: Route;

  properties: Properties;
  dimensions: Dimensions;
  information: VehicleInformation;

  images: string[];

  archived: boolean;
  verified: boolean;

  @Type(() => Reference)
  owner: Reference<User>;

  constructor(data: IVehicleData) {
    super(Vehicle)
    if (data == null) return;
    this.departure = data.departure
    this.departureTime = data.departureTime
    this.arrival = data.arrival
    this.route = data.route
    this.properties = data.properties
    this.dimensions = data.dimensions
    this.information = data.information
    this.images = data.images
    this.archived = data.archived
    this.verified = data.verified
    this.owner = data.owner
  }

  static fromAssignRequestObject(data: {body: VehicleAssignRequestObject, route: Route, user: string}) {
    return new Vehicle({
      departure: data.body.departure,
      departureTime: data.body.departureTime,
      arrival: data.body.arrival,
      route: data.route,
      images: data.body.images,
      dimensions: data.body.dimensions,
      information: data.body.information,
      properties: data.body.properties,
      archived: false,
      verified: false,
      owner: new Reference(data.user),
    })
  }
}
