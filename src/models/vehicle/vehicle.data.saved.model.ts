import { Model } from 'lapisdb'
import { NamedPosition } from '../shared/named.position';
import { VehicleAssignRequestObject } from '../../data/request/vehicle.assign.request.object';
import { Properties, Dimensions } from '../shared/properties.model';
import { VehicleInformation } from '../shared/information.model';
import { Route } from '../shared/route.model';

export interface IVehicleDataSaved {
  departure: NamedPosition;
  departureTime: Date;
  arrival: NamedPosition;
  properties: Properties;
  dimensions: Dimensions;
  information: VehicleInformation;
  images: string[];
}

export class VehicleDataSaved extends Model<VehicleDataSaved> {
  departure: NamedPosition;
  departureTime: Date;

  arrival: NamedPosition;

  properties: Properties;
  dimensions: Dimensions;
  information: VehicleInformation;

  images: string[];

  constructor(data: IVehicleDataSaved) {
    super()
    if (data == null) return;
    this.departure = data.departure
    this.departureTime = data.departureTime
    this.arrival = data.arrival
    this.properties = data.properties
    this.dimensions = data.dimensions
    this.information = data.information
    this.images = data.images
  }

  static fromAssignRequestObject(data: {body: VehicleAssignRequestObject, route: Route, user: string}) {
    return new VehicleDataSaved({
      departure: data.body.departure,
      departureTime: data.body.departureTime,
      arrival: data.body.arrival,
      images: data.body.images,
      dimensions: data.body.dimensions,
      information: data.body.information,
      properties: data.body.properties,
    })
  }
}
