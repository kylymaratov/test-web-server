import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { BalanceService } from './balance.service'
import { ActionBalanceDto } from './dto/actionBalance.dto'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { CurrentUser } from 'src/common/decorators/currentUser.decorator'
import type { TUser } from 'src/@types/user/user.types'

@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @UseGuards(AuthGuard)
  @Get('history')
  getBalanceHistory(@CurrentUser() user: TUser) {
    return this.balanceService.getBalanceHistory(user)
  }

  @UseGuards(AuthGuard)
  @Patch('action')
  actionBalance(@Body() body: ActionBalanceDto, @CurrentUser() user: TUser) {
    return this.balanceService.actionBalance(body, user)
  }
}
