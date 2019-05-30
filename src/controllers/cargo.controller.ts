import { Controller, RoutedController } from '../lapis_server/controller';
import { plainToClass, classToPlain } from 'class-transformer'
import { DatabaseService } from '../database/database.service';
import { CargoAssignRequestObject } from '../data/request/cargo.assign.request.object';
import { validate } from 'class-validator';
import { ValidationService } from '../lapis_server/utils';
import { Cargo } from '../models/cargo.model';
import { BadRequestException } from '../lapis_server/errors';
import { Get, Post } from '../lapis_server/request.methods';

@RoutedController()
export class CargoController extends Controller {
  @Get()
  async getAll(req) {
    const data = await DatabaseService.cargoStore.get().run()
    return data
  }

  @Post()
  async create(req) {
    const data = plainToClass(CargoAssignRequestObject, req.body)
    const errors = await ValidationService.validate(data)
    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    const cargo = await DatabaseService.cargoStore.push().item(new Cargo({
      arrival: data.arrival,
      departure: data.departure,
      description: data.description,
      images: [],
      ownerId: 'xdd',
      price: data.price,
      vehicleType: data.vehicleType,
      volume: data.volume,
      weight: data.weight,
    })).run()

    return cargo
  }
}
