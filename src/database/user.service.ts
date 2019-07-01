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
    const phoneNumberTaken = await DatabaseService.userStore.get({phoneNumber: data.phoneNumber})
    const usernameTaken = await DatabaseService.userStore.get({username: data.username})
    const emailTaken = await DatabaseService.userStore.get({email: data.email})

    return {
      usernameTaken: usernameTaken != null,
      emailTaken: emailTaken != null,
      phoneNumberTaken: phoneNumberTaken != null,
    };
  }

  static async checkCredentials(data: AuthLoginRequestObject): Promise<boolean> {
    const user = await DatabaseService.userStore.get({username: data.username})

    if (user == null) {
      return false
    }

    return compareSync(data.password, user.hashedPassword)
  }
}
