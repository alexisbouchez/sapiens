import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Chat {
  @Field(() => String)
  message: string
}
