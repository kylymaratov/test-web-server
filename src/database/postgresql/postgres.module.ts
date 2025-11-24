import { Module } from '@nestjs/common'
import { PostgresSerivce } from './postgres.service'
import { postgresPoolProvider } from './postgres.provider'
import { Pool } from 'pg'
import { AutoMigration } from './autoMigration'

@Module({
  providers: [PostgresSerivce, postgresPoolProvider, AutoMigration, Pool],
  exports: [PostgresSerivce, Pool],
})
export class PostgresModule {}
