import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { UsersRepository } from '~/users/users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractFromCookie]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload?: { id: string }) {
    if (!payload || !payload.id) {
      throw new UnauthorizedException()
    }

    const userFoundById = await this.usersRepository.findOneById(payload.id)

    if (!userFoundById) {
      throw new UnauthorizedException()
    }

    userFoundById.password = undefined

    return userFoundById
  }
}

function extractFromCookie(request: Request) {
  const cookie = request?.cookies['__sapiens_user_id__']

  return cookie
}
