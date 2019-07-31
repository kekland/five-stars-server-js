import { NamedPosition } from '../models/shared/named.position';
import axios from 'axios'
import { googleMapsKey } from '../secret';
import { Route } from '../models/shared/route.model';

export class GoogleMaps {
  static async getDirections(departure: NamedPosition, arrival: NamedPosition): Promise<Route> {
    try {
      // tslint:disable-next-line:max-line-length
      const data = `json?origin=${departure.latitude},${departure.longitude}&destination=${arrival.latitude},${arrival.longitude}&key=${googleMapsKey}`
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/${data}`)

      if (response.data.routes.length > 0) {
        return new Route({
          distance: response.data.routes[0].legs[0].distance.value,
          polyline: response.data.routes[0].overview_polyline.points,
        })
      }
      else {
        return null;
      }
    }
    catch (e) {
      return null;
    }
  }

  static getDistanceBetweenTwoPoints(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const pi = 3.141592653
    const dLat: number = (lat2 - lat1) *
      pi / 180.0
    const dLon: number = (lon2 - lon1) *
      pi / 180.0

    lat1 = (lat1) * pi / 180.0
    lat2 = (lat2) * pi / 180.0

    const a: number = Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) * Math.cos(lat2);
    const rad: number = 6371;
    const c: number = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }
}
