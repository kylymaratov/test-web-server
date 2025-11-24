import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { TUser } from 'src/@types/user/user.types'

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request

    // const accessToken = request.headers['authorization']
    // OR
    // const cookies = request.cookies['accessToken']

    // const isAuth = accessToken || cookies.accessToken

    // Authorization could be something like this

    const isAuth = true

    const user: TUser = {
      id: 1,
      username: 'test-user',
    }

    if (isAuth) {
      request.user = user
    }

    return true
  }
}
