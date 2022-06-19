import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Profile {
  @Field(() => String)
  id: string

  @Field(() => Float)
  price: string

  @Field(() => String)
  userId: string
}
