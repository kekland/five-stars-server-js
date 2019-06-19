import { Model } from 'lapisdb'
import { NamedPositionWithTime } from '../shared/named.position.with.time';
import { VehicleType } from '../shared/vehicle_type';
import { CargoAssignRequestObject } from '../../data/request/cargo.assign.request.object';
import { CargoInformation } from '../shared/information.model';
import { Dimensions, Properties } from '../shared/properties.model';
import { NamedPosition } from '../shared/named.position';
import { Route } from '../shared/route.model';
import { Type } from 'class-transformer';

export interface ICargoDataSaved {
  departure: NamedPosition;
  departureTime: Date;
  arrival: NamedPosition;
  properties: Properties;
  dimensions: Dimensions;
  information: CargoInformation;
  images: string[];
}

export class CargoDataSaved extends Model<CargoDataSaved> {
  @Type(() => NamedPosition)
  departure: NamedPosition;

  @Type(() => Date)
  departureTime: Date;

  @Type(() => NamedPosition)
  arrival: NamedPosition;

  @Type(() => Properties)
  properties: Properties;

  @Type(() => Dimensions)
  dimensions: Dimensions;

  @Type(() => CargoInformation)
  information: CargoInformation;

  images: string[];

  constructor(data: ICargoDataSaved) {
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

  static fromAssignRequestObject(data: { body: CargoAssignRequestObject, route: Route, user: string }) {
    return new CargoDataSaved({
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
