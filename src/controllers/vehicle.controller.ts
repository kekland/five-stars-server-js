import { Controller, RoutedController } from '../lapis_server/controller';
import { DatabaseService } from '../database/database.service';
import { ValidationService } from '../lapis_server/utils';
import { BadRequestException, UnauthorizedException } from '../lapis_server/errors';
import { Post, Put, Delete } from '../lapis_server/request.methods';
import { GoogleMaps } from '../maps/google.maps';
import { NamedPosition } from '../models/shared/named.position';
import * as moment from 'moment';
import { Vehicle } from '../models/vehicle/vehicle.model';
import { VehicleAssignRequestObject } from '../data/request/vehicle/vehicle.assign.request.object';
import { VehicleGetRequestObject } from '../data/request/vehicle/vehicle.get.request.object';

@RoutedController('/vehicle')
export class VehicleController extends Controller {
  @Post('/get')
  async getAll(req) {
    const filterData = await ValidationService
      .transformAndValidate<VehicleGetRequestObject>(req.body, () => VehicleGetRequestObject)
    const now = moment().unix()

    const data = await DatabaseService.vehicleStore.get().where(item => filterData.filter(item, { now })).run()
    return data
  }

  @Post('/')
  async create(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to add vehicle.' })
    }
    const data = await ValidationService
      .transformAndValidate<VehicleAssignRequestObject>(req.body, () => VehicleAssignRequestObject)

    const route = await GoogleMaps.getDirections(data.departure, data.arrival)

    const vehicle = await DatabaseService.vehicleStore.push()
      .item(Vehicle.fromAssignRequestObject({ body: data, route, user: req.payload.username })).run()

    const user = await DatabaseService.userStore.get().where((item) => item.username === req.payload.username).first()
    await DatabaseService.userStore.edit().item(user).with({ vehicles: [...user.vehicles, vehicle.meta.id] }).run()

    return vehicle
  }

  @Put('/:id')
  async update(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this vehicle.' })
    }

    const data = await ValidationService
      .transformAndValidate<VehicleAssignRequestObject>(req.body, () => VehicleAssignRequestObject)

    let vehicle = await DatabaseService.vehicleStore.get()
      .where((item) => item.meta.id === req.params.id && item.owner === req.payload.username).first()

    if (vehicle == null) {
      throw new BadRequestException({ message: 'Vehicle with this ID is not found.' })
    }

    let route = vehicle.route
    if (NamedPosition.arePositionsEqual(vehicle.departure, data.departure) ||
      NamedPosition.arePositionsEqual(vehicle.arrival, data.arrival)) {
      route = await GoogleMaps.getDirections(data.departure, data.arrival)
    }
    await DatabaseService.vehicleStore.edit().id(req.params.id).with({
      arrival: data.arrival,
      departure: data.departure,
      departureTime: data.departureTime,
      dimensions: data.dimensions,
      images: data.images,
      information: data.information,
      properties: data.properties,
      verified: false,
    }).run()

    vehicle = await DatabaseService.vehicleStore.get().where((item) => item.meta.id === req.params.id).first()

    return vehicle;
  }

  @Delete('/:id')
  async delete(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this vehicle.' })
    }

    const vehicle = await DatabaseService.vehicleStore.get()
      .where((item) => item.meta.id === req.params.id && item.owner === req.payload.username).first()

    if (vehicle == null) {
      throw new BadRequestException({ message: 'Vehicle with this ID was not found.' })
    }

    await DatabaseService.vehicleStore.delete().id(req.params.id).run()

    return { deleted: true }
  }
}
