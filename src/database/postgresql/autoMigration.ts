import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Pool } from 'pg'

@Injectable()
export class AutoMigration implements OnModuleInit {
  private logger = new Logger(AutoMigration.name)

  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async onModuleInit() {
    await this.start()
    await this.createTestUser()
  }

  private async start() {
    await this.pool.query(
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS balances (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        amount NUMERIC(18, 2) NOT NULL DEFAULT 10000 
    );

    CREATE TABLE IF NOT EXISTS balance_history (
        id SERIAL PRIMARY KEY,
        balance_id INTEGER NOT NULL REFERENCES balances(id) ON DELETE CASCADE,
        change_amount NUMERIC(18, 2) NOT NULL,
        available_amount NUMERIC(18, 2) NOT NULL,
        action TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`,
    )

    this.logger.log(`Auto migration successfilly aplied`)
  }

  private async createTestUser() {
    const user = await this.pool.query(
      `INSERT INTO users (username) VALUES ($1) ON CONFLICT (username) DO NOTHING RETURNING *`,
      ['test-user'],
    )

    if (user.rowCount !== 0 && user.rows[0]) {
      await this.pool.query(
        `INSERT INTO balances (user_id, amount) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING`,
        [user.rows[0].id, 10000],
      )
    }

    this.logger.log(`Test user successfilly created`)
  }
}
