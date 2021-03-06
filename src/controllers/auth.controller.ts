import { RoutedController, Controller } from '../lapis_server/controller';
import { Post } from '../lapis_server/request.methods';
import { ValidationService } from '../lapis_server/utils';
import { AuthRegisterRequestObject } from '../data/request/auth/auth.register.request.object';
import { DatabaseService } from '../database/database.service';
import { User } from '../models/user/user.model';
import { BadRequestException, UnauthorizedException } from '../lapis_server/errors';
import { UserService } from '../database/user.service';
import { AuthAvailabilityRequestObject } from '../data/request/auth/auth.availability.request.object';
import { sign, decode, verify } from 'jsonwebtoken'
import { Request } from 'express'
import { AuthLoginRequestObject, AuthChangePasswordRequestObject } from '../data/request/auth/auth.login.request.object';
import { secretKey } from '../secret';
import * as admin from 'firebase-admin'
import { hashSync, genSaltSync } from 'bcrypt';

// tslint:disable-next-line:no-var-requires
const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://five-stars-ae4d1.firebaseio.com',
});

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

    await user.save()

    const jwtToken = sign({ username: user.username }, secretKey, { expiresIn: '1d' })
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

    const jwtToken = sign({ username: data.username }, secretKey, { expiresIn: '1d' })
    return { token: jwtToken }
  }

  @Post('/changePassword')
  async changePassword(req: any) {
    const data = await ValidationService
      .transformAndValidate<AuthChangePasswordRequestObject>(req.body, () => AuthChangePasswordRequestObject)

    const user = await DatabaseService.userStore.get({ phoneNumber: data.phoneNumber })

    try {
      const fireUser = await admin.auth().getUserByPhoneNumber(data.phoneNumber)
      const newHash = hashSync(data.password, genSaltSync(10))
      user.hashedPassword = newHash
      await user.save()
      await admin.auth().deleteUser(fireUser.uid)

      return { saved: true }
    }
    catch (e) {
      throw new BadRequestException({ message: 'Not allowed.' })
    }
  }
}
