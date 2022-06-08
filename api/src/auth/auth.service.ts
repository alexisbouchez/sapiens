import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { AuthCredentialsInput } from './dto/auth-credentials.input'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { UsersService } from '~/users/users.service'
import { UsersRepository } from '~/users/users.repository'
import { compare } from 'bcrypt'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  authenticate(user: User, response: Response): void {
    response.cookie('__sapiens_user_id__', user.id, {
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
}
