import { TBalanceAction } from '../balance/balance.types'

export interface TUser {
  id: number
  username: string
}

export interface TUserBalance {
  id: number
  user_id: number
  amount: number
}

export interface TUserBalanceHistory {
  id: number
  action: TBalanceAction
  balance_id: number
  change_amount: number
  available_amount: number
  date: Date
}
