import { RoutedController, Controller } from '../lapis_server/controller';
import { Get } from '../lapis_server/request.methods';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '../lapis_server/errors';

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
}
