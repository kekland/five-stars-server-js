import { RoutedController, Controller } from '../lapis_server/controller';
import { Post } from '../lapis_server/request.methods';
import { ValidationService } from '../lapis_server/utils';
import { AuthRegisterRequestObject } from '../data/request/auth.register.request.object';
import { DatabaseService } from '../database/database.service';
import { User } from '../models/user.model';
import { BadRequestException } from '../lapis_server/errors';
import { UserService } from '../database/user.service';
import { AuthAvailabilityRequestObject } from '../data/request/auth.availability.request.object';
import { sign, decode, verify } from 'jsonwebtoken'
import { Request } from 'express'
import { AuthLoginRequestObject } from '../data/request/auth.login.request.object';

@RoutedController('/auth')
export class AuthController extends Controller {
  constructor() {
    super();
  }

  @Post('/availability')
  async checkAvailability(req: Request) {
    const data = await ValidationService
      .transformAndValidate<AuthAvailabilityRequestObject>(req.body, () => AuthAvailabilityRequestObject)

    const availability = await UserService.isUserAvailable({
      email: data.email,
      username: data.username,
      phoneNumber: data.phoneNumber,
    })

    return availability
  }

  @Post('/register')
  async register(req: Request) {
    const data = await ValidationService
      .transformAndValidate<AuthRegisterRequestObject>(req.body, () => AuthRegisterRequestObject)

    const user = User.fromAuthRegisterRequestObject(data)
    const availability = await UserService.isUserAvailable({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    })
    if (availability.usernameTaken || availability.phoneNumberTaken || availability.emailTaken) {
      throw new BadRequestException(availability)
    }

    await DatabaseService.userStore.push().item(user).run()

    const jwtToken = sign({ username: user.username }, 'my-secret-key', { expiresIn: '1d' })
    return { token: jwtToken }
  }

  @Post('/login')
  async login(req: Request) {
    const data = await ValidationService
      .transformAndValidate<AuthLoginRequestObject>(req.body, () => AuthLoginRequestObject)

    const credentialsCorrect = await UserService.checkCredentials(data)

    if (!credentialsCorrect) {
      throw new BadRequestException({ message: 'Invalid username or password' })
    }

    const jwtToken = sign({ username: data.username }, 'my-secret-key', { expiresIn: '1d' })
    return { token: jwtToken }
  }
}
