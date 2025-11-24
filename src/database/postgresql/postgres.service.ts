import { Inject, Injectable } from '@nestjs/common'
import { Pool, PoolClient } from 'pg'
import { TBalanceAction } from 'src/@types/balance/balance.types'
import {
  TUser,
  TUserBalance,
  TUserBalanceHistory,
} from 'src/@types/user/user.types'

@Injectable()
export class PostgresSerivce {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async getUserById(userId: number): Promise<TUser | null> {
    const result = await this.pool.query('SELECT id FROM users WHERE id = $1', [
      userId,
    ])

    if (result.rowCount === 0) return null

    return result.rows[0] as TUser
  }

  async getUserBalance(userId: number): Promise<TUserBalance | null> {
    const result = await this.pool.query(
      `
        SELECT * FROM balances WHERE user_id = $1`,
      [userId],
    )

    if (result.rowCount === 0) return null

    return result.rows[0] as TUserBalance
  }

  async getUserBalanceHistory(
    balanceId: number,
  ): Promise<TUserBalanceHistory[]> {
    const result = await this.pool.query(
      `SELECT * FROM balance_history WHERE balance_id = $1 ORDER BY created_at DESC`,
      [balanceId],
    )

    return result.rows as TUserBalanceHistory[]
  }

  async changeBalance(
    userId: number,
    changeAmount: number,
    action: TBalanceAction,
  ): Promise<TUserBalanceHistory | null> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')

      const balanceRes = await client.query(
        'SELECT * FROM balances WHERE user_id = $1 FOR UPDATE',
        [userId],
      )

      if (balanceRes.rowCount === 0) throw new Error('User balance not found')

      const currentBalance = balanceRes.rows[0]
      const balanceId = currentBalance.id
      const currentAmount = parseFloat(currentBalance.amount)

      let newAmount: number = -1

      if (changeAmount <= 0) throw new Error('Change amount must be positive')

      if (action === TBalanceAction.REPLENISHMENT) {
        newAmount = currentAmount + changeAmount
      }

      if (action === TBalanceAction.WRITE_OFF) {
        newAmount = currentAmount - changeAmount
      }

      if (newAmount < 0) throw new Error('Insufficient funds')

      await client.query('UPDATE balances SET amount = $1 WHERE id = $2', [
        newAmount,
        balanceId,
      ])

      const actionInfo = await this.saveBalanceHistory(client, [
        balanceId,
        changeAmount,
        newAmount,
        action,
        new Date(),
      ])

      await client.query('COMMIT')

      return actionInfo
    } catch (error) {
      await client.query('ROLLBACK')
      return null
    } finally {
      client.release()
    }
  }

  async saveBalanceHistory(
    client: PoolClient,
    data: any[],
  ): Promise<TUserBalanceHistory> {
    const result = await client.query(
      `INSERT INTO balance_history 
          (balance_id, change_amount, available_amount, action, created_at)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      data,
    )

    return result.rows[0] as TUserBalanceHistory
  }
}
