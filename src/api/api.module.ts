import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { BalanceModule } from './balance/balance.module'
import { SessionModule } from 'src/modules/session/session.module'

@Module({
  imports: [UserModule, BalanceModule, SessionModule],
})
export class ApiModule {}
