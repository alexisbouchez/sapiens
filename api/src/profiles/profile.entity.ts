import { Field, Float, ObjectType } from '@nestjs/graphql'
import { User } from '~/users/user.entity'

@ObjectType()
export class Profile {
  @Field(() => String)
  id: string

  @Field(() => Float)
  price: string

  @Field(() => User)
  user: User
}
