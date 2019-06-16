import { Bounded } from '../../models/bounded.model';
import { FilterObject } from './filterable.object';
import { Cargo } from '../../models/cargo.model';
import { VehicleType } from '../../models/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';
import { IFilter } from 'lapisdb/dist/database/filter/filter.types';

export class CargoGetRequestObject implements FilterObject<Cargo> {
  departure: string;

  @Type(() => Date)
  departureTime: Date;

  arrival: string;

  @Type(() => Bounded)
  weight: Bounded;
  @Type(() => Bounded)
  volume: Bounded;
  @Type(() => Bounded)
  distance: Bounded;

  @Type(() => Bounded)
  width: Bounded;
  @Type(() => Bounded)
  height: Bounded;
  @Type(() => Bounded)
  length: Bounded;

  dangerous: boolean;
  archived: boolean;
  verified: boolean;
  removeOld: boolean;

  oldThreshold: number;

  vehicleType: VehicleType;

  identifiers: string[];

  areDaysEqual(t: any): boolean {
    const time: Date = new Date(t)
    return time.getDate() === this.departureTime.getDate() &&
      time.getMonth() === this.departureTime.getMonth() &&
      time.getUTCFullYear() === this.departureTime.getUTCFullYear()
  }

  filter(data: IFilter<Cargo>, params: { now: number }): boolean {
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
    if (this.departureTime != null) value = value && this.areDaysEqual(data.departureTime);
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

    if (this.dangerous != null) value = value && this.dangerous === data.information.dangerous;
    if (this.vehicleType != null) value = value && this.vehicleType === data.information.vehicleType;
    if (this.archived != null) value = value && (this.archived) ? true : this.archived === data.archived;
    if (this.verified != null) value = value && this.verified === data.verified;

    return value
  }
}
