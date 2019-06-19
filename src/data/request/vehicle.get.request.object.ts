import { Bounded } from '../../models/shared/bounded.model';
import { FilterObject } from './filterable.object';
import { VehicleType } from '../../models/shared/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';
import { IFilter } from 'lapisdb/dist/database/filter/filter.types';
import { Vehicle } from '../../models/vehicle/vehicle.model';

export class VehicleGetRequestObject implements FilterObject<Vehicle> {
  departure: string;

  @Type(() => Date)
  departureTime: Date;

  arrival: string;

  @Type(() => Bounded)
  weight: Bounded<number>;
  @Type(() => Bounded)
  volume: Bounded<number>;
  @Type(() => Bounded)
  distance: Bounded<number>;

  @Type(() => Bounded)
  width: Bounded<number>;
  @Type(() => Bounded)
  height: Bounded<number>;
  @Type(() => Bounded)
  length: Bounded<number>;

  archived: boolean;
  verified: boolean;
  removeOld: boolean;

  oldThreshold: number;

  vehicleType: VehicleType;

  identifiers: string[];

  filter(data: IFilter<Vehicle>, params: { now: number }): boolean {
    let value: boolean = true
    if (this.removeOld) {
      if (params.now - data.meta.created > this.oldThreshold) {
        return false
      }
    }

    if (this.identifiers != null) {
      if (!this.identifiers.includes(data.meta.id)) {
        return false
      }
    }

    if (this.departure != null) value = value && data.departure.name === this.departure;
    if (this.departureTime != null) value = value && data.departureTime === this.departureTime;
    if (this.arrival != null) value = value && data.arrival.name === this.arrival;
    if (this.weight != null) value = value && this.weight.doesFit(data.properties.weight);
    if (this.volume != null) value = value && this.volume.doesFit(data.properties.volume);
    if (this.distance != null) {
      if (data.route != null) value = value && this.distance.doesFit(data.route.distance);
      else value = false;
    }

    if (this.width != null) value = value && this.width.doesFit(data.dimensions.width);
    if (this.height != null) value = value && this.height.doesFit(data.dimensions.height);
    if (this.length != null) value = value && this.length.doesFit(data.dimensions.length);

    if (this.vehicleType != null) value = value && this.vehicleType === data.information.vehicleType;
    if (this.archived != null) value = value && this.archived === data.archived;
    if (this.verified != null) value = value && this.verified === data.verified;

    return value
  }
}
