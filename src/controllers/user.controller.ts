import { RoutedController, Controller } from '../lapis_server/controller';
import { Get, Put } from '../lapis_server/request.methods';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '../lapis_server/errors';
import { ValidationService } from '../lapis_server/utils';
import { ProfileEditRequestObject } from '../data/request/profile.edit.request.object';
import { UserProfileResponseObject } from '../data/response/user.profile.response.object';
import { Cargo } from '../models/cargo/cargo.model';
import { Vehicle } from '../models/vehicle/vehicle.model';
import { CargoDataSaved } from '../models/cargo/cargo.data.saved.model';
import { VehicleDataSaved } from '../models/vehicle/vehicle.data.saved.model';

@RoutedController('/user')
export class UserController extends Controller {
  constructor() {
    super()
  }

  @Get('/:username')
  async getProfile(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    else {
      return new UserProfileResponseObject(user);
    }
  }

  @Put('/:username')
  async editProfile(req) {
    const username = req.params.username

    const data = await ValidationService
      .transformAndValidate<ProfileEditRequestObject>(req.body, () => ProfileEditRequestObject)

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    else {
      user.organization = data.organization || user.organization
      user.email = data.email || user.email
      user.name = data.name || user.name
      user.phoneNumber = data.phoneNumber || user.phoneNumber

      await user.save()

      return user;
    }
  }

  @Get('/:username/cargo/favorite')
  async getFavoriteCargo(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    const cargos = await Promise.all(user.favoriteCargo.map((c) => c.get(Cargo)))
    return cargos
  }

  @Get('/:username/cargo')
  async getCargos(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    const cargos = await Promise.all(user.cargo.map((c) => c.get(Cargo)))
    return cargos
  }

  @Get('/:username/cargo/saved')
  async getSavedCargos(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    const cargos = await Promise.all(user.savedCargoData.map((c) => c.get(CargoDataSaved)))
    return cargos
  }

  @Get('/:username/vehicle/favorite')
  async getFavoriteVehicle(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    const cargos = await Promise.all(user.favoriteVehicles.map((c) => c.get(Vehicle)))
    return cargos
  }

  @Get('/:username/vehicle')
  async getVehicles(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    const cargos = await Promise.all(user.vehicles.map((c) => c.get(Vehicle)))
    return cargos
  }

  @Get('/:username/vehicle/saved')
  async getSavedVehicles(req) {
    const username = req.params.username

    const user = await DatabaseService.userStore.get({ username })

    if (user == null) {
      throw new BadRequestException({ message: 'User with this username was not found.' })
    }
    const cargos = await Promise.all(user.savedVehicleData.map((c) => c.get(VehicleDataSaved)))
    return cargos
  }
}
