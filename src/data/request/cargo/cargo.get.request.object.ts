import { Bounded } from '../../../models/shared/bounded.model';
import { FilterObject } from '../filterable.object';
import { Cargo } from '../../../models/cargo/cargo.model';
import { VehicleType } from '../../../models/shared/vehicle_type';
import * as Validator from 'class-validator'
import { Type } from 'class-transformer';
import moment = require('moment');
import { GoogleMaps } from '../../../maps/google.maps';
import { NamedPosition } from '../../../models/shared/named.position';

export class CargoGetRequestObject implements FilterObject<Cargo> {
  @Type(() => NamedPosition)
  departure: NamedPosition;

  @Type(() => Bounded)
  departureTime: Bounded<Date>;

  @Type(() => NamedPosition)
  arrival: NamedPosition;

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

  dangerous: boolean;
  archived: boolean;
  verified: boolean;
  removeOld: boolean;

  oldThreshold: number;

  vehicleType: VehicleType;

  identifiers: string[];

  isInDayRange(t: any): boolean {
    const timestamp = moment(t).unix()
    const lowerBound = moment(this.departureTime.lower).unix()
    const upperBound = moment(this.departureTime.upper).unix()

    return (lowerBound <= timestamp) && (timestamp <= upperBound);
  }

  filter(data: Partial<Cargo>, params: { now: number }): boolean {
    try {
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

      if (this.departure != null) {
        value = value &&
          (GoogleMaps.getDistanceBetweenTwoPoints(data.departure.latitude, data.departure.longitude,
            this.departure.latitude, this.departure.longitude) < 250.0);
      }
      if (this.departureTime != null) value = value && this.isInDayRange(data.departureTime);
      if (this.arrival != null) {
        value = value &&
          (GoogleMaps.getDistanceBetweenTwoPoints(data.arrival.latitude, data.arrival.longitude,
            this.arrival.latitude, this.arrival.longitude) < 250.0);
      }
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
    catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e)
      return false
    }
  }
}
