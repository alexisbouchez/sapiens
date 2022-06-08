import { InputType } from '@nestjs/graphql'
import { AuthCredentialsInput } from '~/auth/dto/auth-credentials.input'

@InputType()
export class CreateUserInput extends AuthCredentialsInput {}
