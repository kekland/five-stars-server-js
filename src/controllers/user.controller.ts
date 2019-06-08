import { RoutedController, Controller } from '../lapis_server/controller';
import { Get, Put } from '../lapis_server/request.methods';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '../lapis_server/errors';
import { ValidationService } from '../lapis_server/utils';
import { ProfileEditRequestObject } from '../data/request/profile.edit.request.object';

@RoutedController('/user')
export class UserController extends Controller {
  constructor() {
    super()
  }

  @Get('/:username')
  async getProfile(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get().where((item) => item.username === username).first()

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    else {
      return user;
    }
  }

  @Put('/:username')
  async editProfile(req) {
    const username = req.params.username

    const data = await ValidationService
      .transformAndValidate<ProfileEditRequestObject>(req.body, () => ProfileEditRequestObject)

    let user = await DatabaseService.userStore.get().where((item) => item.username === username).first()

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    else {
      await DatabaseService.userStore.edit().item(user)
        .with({ organization: data.organization, email: data.email, name: data.name, phoneNumber: data.phoneNumber }).run();

      user = await DatabaseService.userStore.get().where((item) => item.username === username).first()
      return user;
    }
  }
}
