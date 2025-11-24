import { ConfigService } from '@nestjs/config'
import { Pool } from 'pg'

export const postgresPoolProvider = {
  provide: 'PG_POOL',
  useFactory: () => {
    return new Pool({
      connectionString: new ConfigService().get<string>('POSTGRES_URL'),
    })
  },
}
