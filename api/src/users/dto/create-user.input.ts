import { Field, InputType } from '@nestjs/graphql'
import { IsEnum } from 'class-validator'
import { AuthCredentialsInput } from '~/auth/dto/auth-credentials.input'
import { Role } from '../role.enum'

@InputType()
export class CreateUserInput extends AuthCredentialsInput {
  @Field(() => String)
  @IsEnum(Role)
  role: string
}
