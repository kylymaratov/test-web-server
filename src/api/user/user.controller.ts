import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from 'src/common/decorators/currentUser.decorator'
import { AuthGuard } from 'src/common/guards/auth.guard'
import type { TUser } from 'src/@types/user/user.types'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: TUser) {
    return this.userService.getMe(user)
  }
}
