import { RoutedController, Controller } from '../lapis_server/controller';
import { Post, Put, Delete } from '../lapis_server/request.methods';
import { ValidationService } from '../lapis_server/utils';
import { VehicleGetRequestObject } from '../data/request/vehicle/vehicle.get.request.object';
import { DatabaseService } from '../database/database.service';
import { UnauthorizedException, BadRequestException } from '../lapis_server/errors';
import { VehicleAssignRequestObject } from '../data/request/vehicle/vehicle.assign.request.object';
import { GoogleMaps } from '../maps/google.maps';
import { Vehicle } from '../models/vehicle/vehicle.model';
import { VehicleDataSaved } from '../models/vehicle/vehicle.data.saved.model';
import { Reference } from 'lapisdb';
import { NamedPosition } from '../models/shared/named.position';

@RoutedController('/vehicle')
export class VehicleController extends Controller {
  @Post('/get')
  async getAll(req) {
    const filterData = await ValidationService
      .transformAndValidate<VehicleGetRequestObject>(req.body, () => VehicleGetRequestObject, false)
    const now = Date.now()

    const data = await DatabaseService.vehicleStore.getItems({ filter: item => filterData.filter(item, { now }) })
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
    const vehicle = await Vehicle.fromAssignRequestObject({ body: data, route, user: req.payload.username }).save()

    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]
    user.vehicles.push(vehicle.getReference())
    await user.save()

    return vehicle
  }

  @Post('/saved')
  async createSaved(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to add vehicle.' })
    }
    const data = await ValidationService
      .transformAndValidate<VehicleAssignRequestObject>(req.body, () => VehicleAssignRequestObject)

    const route = await GoogleMaps.getDirections(data.departure, data.arrival)

    const vehicle = await VehicleDataSaved.fromAssignRequestObject({ body: data, route, user: req.payload.username }).save()

    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]
    user.savedVehicleData.push(vehicle.getReference())
    await user.save()

    return vehicle
  }

  @Post('/:id/favorite')
  async favorite(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this vehicle.' })
    }
    const vehicleId = req.params.id
    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]

    if (user.favoriteVehicles.some(ref => ref.id === vehicleId)) return vehicleId;

    user.favoriteVehicles.push(new Reference(vehicleId))
    await user.save()

    return vehicleId
  }

  @Post('/:id/unfavorite')
  async unfavorite(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this vehicle.' })
    }
    const vehicleId = req.params.id

    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]

    if (!user.favoriteVehicles.some(ref => ref.id === vehicleId)) return vehicleId;

    const index = user.favoriteVehicles.findIndex((v) => v.id === vehicleId)
    user.favoriteVehicles.splice(index, 1)
    await user.save()

    return vehicleId
  }

  @Put('/:id')
  async update(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this vehicle.' })
    }

    const data = await ValidationService
      .transformAndValidate<VehicleAssignRequestObject>(req.body, () => VehicleAssignRequestObject)

    const vehicle = await DatabaseService.vehicleStore.get(req.params.id)
    if (vehicle == null || vehicle.owner.id !== req.payload.username) {
      throw new BadRequestException({ message: 'Vehicle with this ID is not found.' })
    }

    if (NamedPosition.arePositionsDifferent(vehicle.departure, data.departure) ||
      NamedPosition.arePositionsDifferent(vehicle.arrival, data.arrival)) {
      vehicle.route = await GoogleMaps.getDirections(data.departure, data.arrival)
    }

    vehicle.arrival = data.arrival || vehicle.arrival
    vehicle.departure = data.departure || vehicle.departure
    vehicle.departureTime = data.departureTime || vehicle.departureTime
    vehicle.dimensions = data.dimensions || vehicle.dimensions
    vehicle.images = data.images || vehicle.images
    vehicle.information = data.information || vehicle.information
    vehicle.properties = data.properties || vehicle.properties
    vehicle.verified = false

    await vehicle.save()

    return vehicle;
  }

  @Delete('/:id')
  async delete(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this vehicle.' })
    }

    const vehicle = await DatabaseService.vehicleStore.get(req.params.id)
    if (vehicle == null || vehicle.owner.id !== req.payload.username) {
      throw new BadRequestException({ message: 'Vehicle with this ID is not found.' })
    }

    await vehicle.delete()

    return { deleted: true }
  }
}
