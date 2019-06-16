import { Controller, RoutedController } from '../lapis_server/controller';
import { plainToClass, classToPlain } from 'class-transformer'
import { DatabaseService } from '../database/database.service';
import { validate } from 'class-validator';
import { ValidationService } from '../lapis_server/utils';
import { BadRequestException, UnauthorizedException } from '../lapis_server/errors';
import { Request } from 'express'
import { Get, Post, Put, Delete } from '../lapis_server/request.methods';
import { GetBatchedRequestObject } from '../data/request/getBatched.request.object';
import { GoogleMaps } from '../maps/google.maps';
import { VehicleAssignRequestObject } from '../data/request/vehicle.assign.request.object';
import { Vehicle } from '../models/vehicle.model';
import { NamedPosition } from '../models/named.position';

@RoutedController('/vehicle')
export class VehicleController extends Controller {
  @Get('/')
  async getAll(req) {
    const data = await DatabaseService.vehicleStore.get().where(item => !item.archived).run()
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

    const vehicle = await DatabaseService.vehicleStore.push().item(Vehicle.fromAssignRequestObject(data, route, req.payload.username)).run()

    const user = await DatabaseService.userStore.get().where((item) => item.username === req.payload.username).first()
    await DatabaseService.userStore.edit().item(user).with({ vehicles: [...user.vehicles, vehicle.meta.id] }).run()

    return vehicle
  }

  @Post('/getBatched')
  async getBatched(req) {
    const data = await ValidationService
      .transformAndValidate<GetBatchedRequestObject>(req.body, () => GetBatchedRequestObject)

    const vehicles = await DatabaseService.vehicleStore.get().where((item) => data.values.includes(item.meta.id) && !item.archived).run()

    return vehicles
  }

  @Put('/:id')
  async update(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this vehicle.' })
    }

    const data = await ValidationService
      .transformAndValidate<VehicleAssignRequestObject>(req.body, () => VehicleAssignRequestObject)

    let vehicle = await DatabaseService.vehicleStore.get().where((item) => item.meta.id === req.params.id).first()

    if (vehicle == null) {
      throw new BadRequestException({ message: 'Vehicle with this ID is not found.' })
    }
    else if (vehicle.ownerId !== req.payload.username) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this vehicle.' })
    }

    let route = vehicle.route
    if (NamedPosition.arePositionsEqual(vehicle.departure, data.departure) ||
        NamedPosition.arePositionsEqual(vehicle.arrival, data.arrival)) {
      route = await GoogleMaps.getDirections(data.departure, data.arrival)
    }

    await DatabaseService.vehicleStore.edit().id(req.params.id).with({
      arrival: data.arrival,
      departure: data.departure,
      description: data.description,
      images: data.images,
      vehicleType: data.vehicleType,
      volume: data.volume,
      route,
      weight: data.weight,
    }).run()

    vehicle = await DatabaseService.vehicleStore.get().where((item) => item.meta.id === req.params.id).first()

    return vehicle;
  }

  @Delete('/:id')
  async delete(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this vehicle.' })
    }

    const vehicle = await DatabaseService.vehicleStore.get().where((item) => item.meta.id === req.params.id).first()

    if (vehicle == null) {
      throw new BadRequestException({ message: 'Vehicle with this ID is not found.' })
    }
    else if (vehicle.ownerId !== req.payload.username) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this vehicle.' })
    }

    await DatabaseService.vehicleStore.delete().id(req.params.id).run()

    return { deleted: true }
  }
}
