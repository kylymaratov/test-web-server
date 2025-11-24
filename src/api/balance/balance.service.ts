import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ActionBalanceDto } from './dto/actionBalance.dto'
import { TUser } from 'src/@types/user/user.types'
import { PostgresSerivce } from 'src/database/postgresql/postgres.service'

@Injectable()
export class BalanceService {
  constructor(private pgService: PostgresSerivce) {}

  async actionBalance(body: ActionBalanceDto, user: TUser) {
    const { action, changeAmount } = body

    const res = await this.pgService.changeBalance(
      user.id,
      changeAmount,
      action,
    )

    if (!res) throw new BadRequestException(`Failed to change amount`)

    return res
  }

  async getBalanceHistory(user: TUser) {
    const userBalance = await this.pgService.getUserBalance(user.id)

    if (!userBalance) throw new NotFoundException('User balance not found')

    return await this.pgService.getUserBalanceHistory(userBalance.id)
  }
}
