import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { authCookieKey } from './constants'

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  private buildCookiesObject(cookie?: string) {
    if (!cookie) {
      return {}
    }

    const sessionCookie = cookie
      .split('; ')
      .find((cookie: string) => cookie.startsWith(authCookieKey))

    if (!sessionCookie) {
      return {}
    }

    const splittedCookie = sessionCookie.split('=')

    if (splittedCookie.length !== 2) {
      return {}
    }

    return { [authCookieKey]: splittedCookie[1] }
  }

  getRequest(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient()

    const { cookie } = client.handshake.headers

    return {
      cookies: this.buildCookiesObject(cookie),
      useWebSockets: true,
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new WsException('Unauthorized')
    }

    return user
  }
}
