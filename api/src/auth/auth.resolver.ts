import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { CreateUserInput } from '~/users/dto/create-user.input'
import { AuthService } from './auth.service'
import { AuthCredentialsInput } from './dto/auth-credentials.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput)
  }

  @Mutation(() => String)
  signIn(
    @Args('authCredentialsInput') authCredentialsInput: AuthCredentialsInput,
  ) {
    return this.authService.signIn(authCredentialsInput)
  }
}
