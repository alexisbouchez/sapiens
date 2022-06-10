import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { JwtAuthGuard } from '~/auth/jwt-auth.guard'
import { CurrentUser } from './current-user.decorator'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './user.entity'
import { User as PrismaUser } from '@prisma/client'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(
    @CurrentUser() currentUser: PrismaUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(currentUser, updateUserInput)
  }
}
