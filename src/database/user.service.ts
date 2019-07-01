import { User } from '../models/user/user.model';
import { DatabaseService } from './database.service';
import { AuthLoginRequestObject } from '../data/request/auth/auth.login.request.object';
import { hashSync, compareSync } from 'bcrypt';

export interface UserAvailability {
  usernameTaken: boolean;
  emailTaken: boolean;
  phoneNumberTaken: boolean;
}

export class UserService {
  static async isUserAvailable(data: { phoneNumber: string, email: string, username: string }): Promise<UserAvailability> {
    const phoneNumberTaken = (await DatabaseService.userStore.getItems({filter: (value) => value.phoneNumber === data.phoneNumber})).length > 0
    const usernameTaken = (await DatabaseService.userStore.getItems({filter: (value) => value.username === data.username})).length > 0
    const emailTaken = (await DatabaseService.userStore.getItems({filter: (value) => value.email === data.email})).length > 0

    return {
      usernameTaken,
      emailTaken,
      phoneNumberTaken,
    };
  }

  static async checkCredentials(data: AuthLoginRequestObject): Promise<boolean> {
    const user = (await DatabaseService.userStore.getItems({filter: (value) => value.username === data.username}))[0]

    if (user == null) {
      return false
    }

    return compareSync(data.password, user.hashedPassword)
  }
}
