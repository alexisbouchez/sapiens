import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsString, Length } from 'class-validator'

@InputType()
export class AuthCredentialsInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsString()
  @Length(8, 255)
  password: string
}
