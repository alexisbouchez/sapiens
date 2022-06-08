import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class AuthCredentialsInput {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}
