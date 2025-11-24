import { TUser } from '../user/user.types'

declare module 'express' {
  interface Request {
    user?: TUser
  }
}
