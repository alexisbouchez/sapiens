import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { AuthCredentialsInput } from './dto/auth-credentials.input'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { UsersService } from '~/users/users.service'
import { UsersRepository } from '~/users/users.repository'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  authenticate(user: User): void {}

  async signUp(createUserInput: CreateUserInput) {
    const createdUser = await this.usersService.create(createUserInput)
    this.authenticate(createdUser)

    return 'You are now signed up.'
  }

  async signIn(authCredentialsInput: AuthCredentialsInput) {
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

    this.authenticate(userFoundByEmail)

    return 'You are now signed in.'
  }
}
