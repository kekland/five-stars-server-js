import { Controller, RoutedController } from '../lapis_server/controller';
import { DatabaseService } from '../database/database.service';
import { CargoAssignRequestObject } from '../data/request/cargo/cargo.assign.request.object';
import { ValidationService } from '../lapis_server/utils';
import { Cargo } from '../models/cargo/cargo.model';
import { BadRequestException, UnauthorizedException } from '../lapis_server/errors';
import { Post, Put, Delete } from '../lapis_server/request.methods';
import { GoogleMaps } from '../maps/google.maps';
import { NamedPosition } from '../models/shared/named.position';
import { CargoGetRequestObject } from '../data/request/cargo/cargo.get.request.object';
import { GetOperation, Reference } from 'lapisdb';
import { CargoDataSaved } from '../models/cargo/cargo.data.saved.model';

@RoutedController('/cargo')
export class CargoController extends Controller {
  @Post('/get')
  async getAll(req) {
    const filterData = await ValidationService
      .transformAndValidate<CargoGetRequestObject>(req.body, () => CargoGetRequestObject, false)
    const now = Date.now()

    const data = await DatabaseService.cargoStore.getItems({ filter: item => filterData.filter(item, { now }) })
    return data
  }

  @Post('/')
  async create(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to add cargo.' })
    }
    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    const route = await GoogleMaps.getDirections(data.departure, data.arrival)
    const cargo = await Cargo.fromAssignRequestObject({ body: data, route, user: req.payload.username }).save()

    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]
    user.cargo.push(cargo.getReference())
    await user.save()

    return cargo
  }

  @Post('/saved')
  async createSaved(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to add cargo.' })
    }
    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    const route = await GoogleMaps.getDirections(data.departure, data.arrival)

    const cargo = await CargoDataSaved.fromAssignRequestObject({ body: data, route, user: req.payload.username }).save()

    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]
    user.savedCargoData.push(cargo.getReference())
    await user.save()

    return cargo
  }

  @Post('/:id/favorite')
  async favorite(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }
    const cargoId = req.params.id
    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]
    const reference = new Reference<Cargo>(cargoId)
    if (user.favoriteCargo.some(ref => ref.id === cargoId)) return cargoId;

    user.favoriteCargo.push(reference)
    await user.save()

    return cargoId
  }

  @Post('/:id/unfavorite')
  async unfavorite(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }
    const cargoId = req.params.id

    const user = (await (DatabaseService.userStore.getItems({ filter: (u) => u.username === req.payload.username })))[0]

    if (!user.favoriteCargo.some(ref => ref.id === cargoId)) return cargoId;

    const index = user.favoriteCargo.findIndex((v) => v.id === cargoId)
    user.favoriteCargo.splice(index, 1)
    await user.save()

    return cargoId
  }

  @Put('/:id')
  async update(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }

    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    const cargo = await DatabaseService.cargoStore.get(req.params.id)
    if (cargo == null || cargo.owner.id !== req.payload.username) {
      throw new BadRequestException({ message: 'Cargo with this ID is not found.' })
    }

    if (NamedPosition.arePositionsDifferent(cargo.departure, data.departure) ||
      NamedPosition.arePositionsDifferent(cargo.arrival, data.arrival)) {
      cargo.route = await GoogleMaps.getDirections(data.departure, data.arrival)
    }

    cargo.arrival = data.arrival || cargo.arrival
    cargo.departure = data.departure || cargo.departure
    cargo.departureTime = data.departureTime || cargo.departureTime
    cargo.dimensions = data.dimensions || cargo.dimensions
    cargo.images = data.images || cargo.images
    cargo.information = data.information || cargo.information
    cargo.properties = data.properties || cargo.properties
    cargo.verified = false

    await cargo.save()

    return cargo;
  }

  @Delete('/:id')
  async delete(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this cargo.' })
    }

    const cargo = await DatabaseService.cargoStore.get(req.params.id)
    if (cargo == null || cargo.owner.id !== req.payload.username) {
      throw new BadRequestException({ message: 'Cargo with this ID is not found.' })
    }

    await cargo.delete()

    return { deleted: true }
  }
}
