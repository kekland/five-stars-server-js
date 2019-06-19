import { Model } from 'lapisdb'
import { NamedPosition } from '../shared/named.position';
import { VehicleAssignRequestObject } from '../../data/request/vehicle.assign.request.object';
import { Properties, Dimensions } from '../shared/properties.model';
import { VehicleInformation } from '../shared/information.model';
import { Route } from '../shared/route.model';

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
  owner: string;
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

  owner: string;

  constructor(data: IVehicleData) {
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
      owner: data.user,
    })
  }
}
