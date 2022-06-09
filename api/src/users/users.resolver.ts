import { UseGuards } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'
import { JwtAuthGuard } from '~/auth/jwt-auth.guard'
import { CurrentUser } from './current-user.decorator'
import { User } from './user.entity'

@Resolver()
export class UsersResolver {
  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return user
  }
}
