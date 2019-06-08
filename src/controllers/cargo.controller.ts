import { Controller, RoutedController } from '../lapis_server/controller';
import { plainToClass, classToPlain } from 'class-transformer'
import { DatabaseService } from '../database/database.service';
import { CargoAssignRequestObject } from '../data/request/cargo.assign.request.object';
import { validate } from 'class-validator';
import { ValidationService } from '../lapis_server/utils';
import { Cargo } from '../models/cargo.model';
import { BadRequestException, UnauthorizedException } from '../lapis_server/errors';
import { Request } from 'express'
import { Get, Post, Put, Delete } from '../lapis_server/request.methods';
import { CargoGetBatchedRequestObject } from '../data/request/cargo.getBatched.request.object';

@RoutedController('/cargo')
export class CargoController extends Controller {
  @Get('/')
  async getAll(req) {
    const data = await DatabaseService.cargoStore.get().where(item => !item.expired).run()
    return data
  }

  @Post('/')
  async create(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to add cargo.' })
    }
    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    const cargo = await DatabaseService.cargoStore.push().item(Cargo.fromAssignRequestObject(data, req.payload.username)).run()

    const user = await DatabaseService.userStore.get().where((item) => item.username === req.payload.username).first()
    await DatabaseService.userStore.edit().item(user).with({ cargo: [...user.cargo, cargo.meta.id] }).run()

    return cargo
  }

  @Post('/getBatched')
  async getBatched(req) {
    const data = await ValidationService
      .transformAndValidate<CargoGetBatchedRequestObject>(req.body, () => CargoGetBatchedRequestObject)

    const cargo = await DatabaseService.cargoStore.get().where((item) => data.values.includes(item.meta.id) && !item.expired).run()

    return cargo
  }

  @Put('/:id')
  async update(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }

    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    let cargo = await DatabaseService.cargoStore.get().where((item) => item.meta.id === req.params.id).first()

    if (cargo == null) {
      throw new BadRequestException({ message: 'Cargo with this ID is not found.' })
    }
    else if (cargo.ownerId !== req.payload.username) {
      throw new UnauthorizedException({ message: 'Not allowed to edit this cargo.' })
    }

    await DatabaseService.cargoStore.edit().id(req.params.id).with({
      arrival: data.arrival,
      departure: data.departure,
      description: data.description,
      images: data.images,
      price: data.price,
      vehicleType: data.vehicleType,
      volume: data.volume,
      weight: data.weight,
    }).run()

    cargo = await DatabaseService.cargoStore.get().where((item) => item.meta.id === req.params.id).first()

    return cargo;
  }

  @Delete('/:id')
  async delete(req) {
    if (req.payload == null) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this cargo.' })
    }

    const cargo = await DatabaseService.cargoStore.get().where((item) => item.meta.id === req.params.id).first()

    if (cargo == null) {
      throw new BadRequestException({ message: 'Cargo with this ID is not found.' })
    }
    else if (cargo.ownerId !== req.payload.username) {
      throw new UnauthorizedException({ message: 'Not allowed to delete this cargo.' })
    }

    await DatabaseService.cargoStore.delete().id(req.params.id).run()

    return { deleted: true }
  }
}
