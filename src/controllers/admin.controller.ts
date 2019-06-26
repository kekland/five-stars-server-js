import { RoutedController, Controller } from '../lapis_server/controller';
import { Post, Get } from '../lapis_server/request.methods';
import { ValidationService } from '../lapis_server/utils';
import { AuthRegisterRequestObject } from '../data/request/auth/auth.register.request.object';
import { DatabaseService } from '../database/database.service';
import { User } from '../models/user/user.model';
import { BadRequestException } from '../lapis_server/errors';
import { UserService } from '../database/user.service';
import { AuthAvailabilityRequestObject } from '../data/request/auth/auth.availability.request.object';
import { sign, decode, verify } from 'jsonwebtoken'
import { Request } from 'express'
import { AuthLoginRequestObject } from '../data/request/auth/auth.login.request.object';
import { secretKey } from '../secret';
import { SetVerifiedRequestObject } from '../data/request/admin/setVerified.request.object';

@RoutedController('/admin')
export class AdminController extends Controller {
  constructor() {
    super();
  }

  @Post('/user/:id/setVerifiedStatus')
  async setUserVerifiedStatus(req: Request) {
    const data = await ValidationService
      .transformAndValidate<SetVerifiedRequestObject>(req.body, () => SetVerifiedRequestObject)
    const user = await DatabaseService.userStore.editItem(req.params.id, { verified: data.status })
    return user
  }

  @Post('/cargo/:id/setVerifiedStatus')
  async setCargoVerifiedStatus(req: Request) {
    const data = await ValidationService
      .transformAndValidate<SetVerifiedRequestObject>(req.body, () => SetVerifiedRequestObject)
    const cargo = await DatabaseService.cargoStore.editItem(req.params.id, { verified: data.status })
    return cargo
  }

  @Post('/vehicle/:id/setVerifiedStatus')
  async setVehicleVerifiedStatus(req: Request) {
    const data = await ValidationService
      .transformAndValidate<SetVerifiedRequestObject>(req.body, () => SetVerifiedRequestObject)
    const vehicle = await DatabaseService.vehicleStore.editItem(req.params.id, { verified: data.status })
    return vehicle
  }

  @Get('/users')
  async getAllUsers(req: Request) {
    const users = await DatabaseService.userStore.get().run()
    return users
  }
}
