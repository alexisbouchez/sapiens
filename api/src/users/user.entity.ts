import { Field, ObjectType } from '@nestjs/graphql'
import { Profile } from '~/profiles/profile.entity'
import { Role } from './role.enum'

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  role: Role

  @Field(() => Profile, { nullable: true })
  profile?: Profile
}
