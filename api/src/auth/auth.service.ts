import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { AuthCredentialsInput } from './dto/auth-credentials.input'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { UsersService } from '~/users/users.service'
import { UsersRepository } from '~/users/users.repository'
import { compare } from 'bcrypt'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  authenticate(user: User, response: Response): void {
    const token = this.jwtService.sign({ id: user.id })

    response.cookie('__sapiens_user_id__', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
  }

  async signUp(createUserInput: CreateUserInput, response: Response) {
    const createdUser = await this.usersService.create(createUserInput)
    this.authenticate(createdUser, response)

    return 'You are now signed up.'
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

    return 'You are now signed in.'
  }

  signOut(response: Response) {
    response.clearCookie('__sapiens_user_id__', {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return 'You are now signed out.'
  }
}
