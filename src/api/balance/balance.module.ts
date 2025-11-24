import { Module } from '@nestjs/common'
import { BalanceController } from './balance.controller'
import { BalanceService } from './balance.service'
import { PostgresModule } from 'src/database/postgresql/postgres.module'

@Module({
  imports: [PostgresModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
