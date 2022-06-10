import { UsePipes, ValidationPipe } from '@nestjs/common'
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { Request } from 'express'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { AuthService } from './auth.service'
import { AuthCredentialsInput } from './dto/auth-credentials.input'
import { User } from '~/users/user.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context('req') { res: response }: Request,
  ) {
    return this.authService.signUp(createUserInput, response)
  }

  @Mutation(() => User)
  signIn(
    @Args('authCredentialsInput') authCredentialsInput: AuthCredentialsInput,
    @Context('req') { res: response }: Request,
  ) {
    return this.authService.signIn(authCredentialsInput, response)
  }

  @Mutation(() => String)
  signOut(@Context('req') { res: response }: Request) {
    return this.authService.signOut(response)
  }
}
