import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { UsersRepository } from '~/users/users.repository'
import { authCookieKey } from './constants'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractFromCookie]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    })
  }

  private throwError(useWebSockets?: boolean) {
    if (useWebSockets) {
      throw new WsException('Unauthorized')
    } else {
      throw new UnauthorizedException()
    }
  }

  async validate(
    request: Request & { useWebSockets?: boolean },
    payload?: { id: string },
  ) {
    if (!payload || !payload.id) {
      this.throwError(request.useWebSockets)
    }

    const userFoundById = await this.usersRepository.findOneById(payload.id)

    if (!userFoundById) {
      this.throwError(request.useWebSockets)
    }

    userFoundById.password = undefined

    return userFoundById
  }
}

function extractFromCookie(request: Request) {
  if (request.headers.cookie) {
    request.cookies = buildCookiesObjectFromCookieString(request.headers.cookie)
  }

  return request.cookies[authCookieKey]
}

function buildCookiesObjectFromCookieString(cookie?: string) {
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
