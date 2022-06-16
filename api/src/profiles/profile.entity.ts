import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Profile {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  userId: string
}
