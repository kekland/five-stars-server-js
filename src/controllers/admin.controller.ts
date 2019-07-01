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
import { UserProfileResponseObject } from '../data/response/user.profile.response.object';

@RoutedController('/admin')
export class AdminController extends Controller {
  constructor() {
    super();
  }

  @Post('/user/:id/setVerifiedStatus')
  async setUserVerifiedStatus(req: Request) {
    const data = await ValidationService
      .transformAndValidate<SetVerifiedRequestObject>(req.body, () => SetVerifiedRequestObject)

    const user = await DatabaseService.userStore.get(req.params.id)
    user.verified = data.status
    await user.save()

    return user
  }

  @Post('/cargo/:id/setVerifiedStatus')
  async setCargoVerifiedStatus(req: Request) {
    const data = await ValidationService
      .transformAndValidate<SetVerifiedRequestObject>(req.body, () => SetVerifiedRequestObject)

    const cargo = await DatabaseService.cargoStore.get(req.params.id)
    cargo.verified = data.status
    await cargo.save()

    return cargo
  }

  @Post('/vehicle/:id/setVerifiedStatus')
  async setVehicleVerifiedStatus(req: Request) {
    const data = await ValidationService
      .transformAndValidate<SetVerifiedRequestObject>(req.body, () => SetVerifiedRequestObject)

    const vehicle = await DatabaseService.vehicleStore.get(req.params.id)
    vehicle.verified = data.status
    await vehicle.save()

    return vehicle
  }

  @Get('/users')
  async getAllUsers(req: Request) {
    const users = await DatabaseService.userStore.getItems()
    return users.map((user) => new UserProfileResponseObject(user))
  }
}
