import { RoutedController, Controller } from '../lapis_server/controller';
import { Post } from '../lapis_server/request.methods';
import { ValidationService } from '../lapis_server/utils';
import { AuthRegisterRequestObject } from '../data/request/auth.register.request.object';
import { DatabaseService } from '../database/database.service';
import { User } from '../models/user.model';
import { BadRequestException } from '../lapis_server/errors';

@RoutedController('/auth')
export class AuthController extends Controller {
  constructor() {
    super();
  }

  @Post('/register')
  async register(req: Request) {
    const data = await ValidationService
      .transformAndValidate<AuthRegisterRequestObject>(req.body, () => AuthRegisterRequestObject)

    const user = User.fromAuthRegisterRequestObject(data)
    const phoneNumberTaken = (await DatabaseService.userStore.get().where((value) => value.phoneNumber === user.phoneNumber).count()) > 0
    const usernameTaken = (await DatabaseService.userStore.get().where((value) => value.username === user.username).count()) > 0
    const emailTaken = (await DatabaseService.userStore.get().where((value) => value.email === user.email).count()) > 0

    if (usernameTaken || emailTaken || phoneNumberTaken) {
      throw new BadRequestException({
        usernameTaken,
        emailTaken,
        phoneNumberTaken,
      });
    }

    await DatabaseService.userStore.push().item(user).run()
  }
}
