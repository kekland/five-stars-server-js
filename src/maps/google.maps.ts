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
}
