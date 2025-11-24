import { Module } from '@nestjs/common'
import { ApiModule } from './api/api.module'
import { ConfigurationModule } from './modules/configuration/configuration.module'
import { PostgresModule } from './database/postgresql/postgres.module'

@Module({
  imports: [ConfigurationModule, PostgresModule, ApiModule],
})
export class AppModule {}
