import { User } from '../models/user.model';
import { DatabaseService } from './database.service';
import { AuthLoginRequestObject } from '../data/request/auth.login.request.object';
import { hashSync, compareSync } from 'bcrypt';

export interface UserAvailability {
  usernameTaken: boolean;
  emailTaken: boolean;
  phoneNumberTaken: boolean;
}

export class UserService {
  static async isUserAvailable(data: { phoneNumber: string, email: string, username: string }): Promise<UserAvailability> {
    const phoneNumberTaken = (await DatabaseService.userStore.get().where((value) => value.phoneNumber === data.phoneNumber).count()) > 0
    const usernameTaken = (await DatabaseService.userStore.get().where((value) => value.username === data.username).count()) > 0
    const emailTaken = (await DatabaseService.userStore.get().where((value) => value.email === data.email).count()) > 0

    return {
      usernameTaken,
      emailTaken,
      phoneNumberTaken,
    };
  }

  static async checkCredentials(data: AuthLoginRequestObject): Promise<boolean> {
    const user = await DatabaseService.userStore.get().where((value) => value.username === data.username).first()

    if (user == null) {
      return false
    }

    return compareSync(data.password, user.hashedPassword)
  }
}
