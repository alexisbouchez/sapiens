import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
import { Response } from 'express'
import { AuthCredentialsInput } from './dto/auth-credentials.input'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { UsersService } from '~/users/users.service'
import { UsersRepository } from '~/users/users.repository'
import { authCookieKey } from './constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  authenticate(user: User, response: Response): void {
    const token = this.jwtService.sign({ id: user.id })

    response.cookie(authCookieKey, token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
  }

  async signUp(createUserInput: CreateUserInput, response: Response) {
    const createdUser = await this.usersService.create(createUserInput)
    this.authenticate(createdUser, response)

    return createdUser
  }

  async signIn(authCredentialsInput: AuthCredentialsInput, response: Response) {
    const userFoundByEmail = await this.usersRepository.findOneByEmail(
      authCredentialsInput.email,
    )

    if (!userFoundByEmail) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const passwordsMatch = await compare(
      authCredentialsInput.password,
      userFoundByEmail.password,
    )

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    this.authenticate(userFoundByEmail, response)

    userFoundByEmail.password = undefined

    return userFoundByEmail
  }

  signOut(response: Response) {
    response.clearCookie(authCookieKey, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return 'You are now signed out.'
  }
}
