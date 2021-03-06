import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Chat {
  @Field(() => String)
  id: string

  @Field(() => String)
  message: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  chatRoomId: string
}
