import { ContextType, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { authCookieKey } from './constants'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext()

      if (ctx.websocketHeader?.connectionParams) {
        const websocketHeader = ctx.websocketHeader?.connectionParams || {}

        return {
          cookies: this.buildCookiesObject(websocketHeader.headers?.cookie),
        }
      }

      return ctx.req
    }

    return context.switchToHttp().getRequest()
  }

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
}
