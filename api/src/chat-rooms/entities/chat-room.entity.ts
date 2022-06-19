import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ChatRoom {
  @Field(() => String)
  id: string

  @Field(() => String)
  otherUserName: string
}
