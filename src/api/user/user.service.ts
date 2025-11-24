import { Injectable } from '@nestjs/common'
import { TUser } from 'src/@types/user/user.types'

@Injectable()
export class UserService {
  async getMe(user: TUser) {
    return user
  }
}
