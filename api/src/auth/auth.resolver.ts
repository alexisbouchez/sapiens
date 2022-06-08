import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { AuthService } from './auth.service'
import { AuthCredentialsInput } from './dto/auth-credentials.input'
import { Request } from 'express'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context('req') { res: response }: Request,
  ) {
    return this.authService.signUp(createUserInput, response)
  }

  @Mutation(() => String)
  signIn(
    @Args('authCredentialsInput') authCredentialsInput: AuthCredentialsInput,
    @Context('req') { cookies, res: response }: Request,
  ) {
    return this.authService.signIn(authCredentialsInput, response)
  }
}
