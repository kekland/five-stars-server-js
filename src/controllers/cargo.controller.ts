import { Controller, RoutedController } from '../lapis_server/controller';
import { DatabaseService } from '../database/database.service';
import { CargoAssignRequestObject } from '../data/request/cargo/cargo.assign.request.object';
import { ValidationService } from '../lapis_server/utils';
import { Cargo } from '../models/cargo/cargo.model';
import { BadRequestException, UnauthorizedException } from '../lapis_server/errors';
import { Post, Put, Delete } from '../lapis_server/request.methods';
import { GoogleMaps } from '../maps/google.maps';
import { NamedPosition } from '../models/shared/named.position';
import * as moment from 'moment';
import { CargoGetRequestObject } from '../data/request/cargo/cargo.get.request.object';

@RoutedController('/cargo')
export class CargoController extends Controller {
  @Post('/get')
  async getAll(req) {
    const filterData = await ValidationService
      .transformAndValidate<CargoGetRequestObject>(req.body, () => CargoGetRequestObject, false)
    const now = moment().unix()

    const data = await DatabaseService.cargoStore.get().where(item => filterData.filter(item, { now })).run()
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

    const cargo = await DatabaseService.cargoStore.push().item(Cargo.fromAssignRequestObject({ body: data, route, user: req.payload.username })).run()

    const user = await DatabaseService.userStore.get().where((item) => item.username === req.payload.username).first()
    await DatabaseService.userStore.edit().item(user).with({ cargo: [...user.cargo, cargo.meta.id] }).run()

    return cargo
  }

  @Post('/:id/favorite')
  async favorite(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }
    const cargoId = req.params.id
    const user = await DatabaseService.userStore.get().where(u => u.username === req.payload.username).first()
    await DatabaseService.userStore.edit().item(user).with({ favoriteCargo: [...user.favoriteCargo, cargoId] });
    return cargoId
  }

  @Post('/:id/unfavorite')
  async unfavorite(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }
    const cargoId = req.params.id
    const user = await DatabaseService.userStore.get().where(u => u.username === req.payload.username).first()
    const index = user.favoriteCargo.indexOf(cargoId)
    await DatabaseService.userStore.edit().item(user).with({ favoriteCargo: user.favoriteCargo.splice(index, 1) });
    return cargoId
  }

  @Put('/:id')
  async update(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }

    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    let cargo = await DatabaseService.cargoStore.get().where((item) => item.meta.id === req.params.id && item.owner === req.payload.username).first()

    if (cargo == null) {
      throw new BadRequestException({ message: 'Cargo with this ID is not found.' })
    }

    let route = cargo.route
    if (NamedPosition.arePositionsEqual(cargo.departure, data.departure) ||
      NamedPosition.arePositionsEqual(cargo.arrival, data.arrival)) {
      route = await GoogleMaps.getDirections(data.departure, data.arrival)
    }
    await DatabaseService.cargoStore.edit().id(req.params.id).with({
      arrival: data.arrival,
      departure: data.departure,
      departureTime: data.departureTime,
      dimensions: data.dimensions,
      images: data.images,
      information: data.information,
      properties: data.properties,
      verified: false,
    }).run()

    cargo = await DatabaseService.cargoStore.get().where((item) => item.meta.id === req.params.id).first()

    return cargo;
  }

  @Delete('/:id')
  async delete(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this cargo.' })
    }

    const cargo = await DatabaseService.cargoStore.get()
      .where((item) => item.meta.id === req.params.id && item.owner === req.payload.username).first()

    if (cargo == null) {
      throw new BadRequestException({ message: 'Cargo with this ID was not found.' })
    }

    await DatabaseService.cargoStore.delete().id(req.params.id).run()

    return { deleted: true }
  }
}
