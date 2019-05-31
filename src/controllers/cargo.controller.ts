import { Controller, RoutedController } from '../lapis_server/controller';
import { plainToClass, classToPlain } from 'class-transformer'
import { DatabaseService } from '../database/database.service';
import { CargoAssignRequestObject } from '../data/request/cargo.assign.request.object';
import { validate } from 'class-validator';
import { ValidationService } from '../lapis_server/utils';
import { Cargo } from '../models/cargo.model';
import { BadRequestException } from '../lapis_server/errors';
import { Request } from 'express'
import { Get, Post, Put } from '../lapis_server/request.methods';

@RoutedController('/cargo')
export class CargoController extends Controller {
  @Get('/')
  async getAll(req) {
    const data = await DatabaseService.cargoStore.get().run()
    return data
  }

  @Post('/')
  async create(req) {
    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)
    const cargo = await DatabaseService.cargoStore.push().item(Cargo.fromAssignRequestObject(data, 'kekland')).run()
    return cargo
  }

  @Put('/:id')
  async update(req: Request) {
    const data = await ValidationService
      .transformAndValidate<CargoAssignRequestObject>(req.body, () => CargoAssignRequestObject)

    const cargo = await DatabaseService.cargoStore.edit().id(req.params.id).with({
      arrival: data.arrival,
      departure: data.departure,
      description: data.description,
      images: data.images,
      price: data.price,
      vehicleType: data.vehicleType,
      volume: data.volume,
      weight: data.weight,
    }).run()

    return cargo;
  }
}
