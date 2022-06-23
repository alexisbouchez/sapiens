import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileUpload } from 'graphql-upload'
import GraphQLUpload = require('graphql-upload/GraphQLUpload.js')
import { JwtAuthGuard } from '~/auth/jwt-auth.guard'
import { CurrentUser } from '~/users/current-user.decorator'
import { User } from '~/users/user.entity'
import { CreateProfileInput } from './dto/create-profile.input'
import { Profile } from './profile.entity'
import { ProfilesService } from './profiles.service'

@Resolver()
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Profile)
  createProfile(
    @CurrentUser() user: User,
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profilesService.create(user, createProfileInput)
  }

  @Query(() => Profile)
  profile(@Args('id') id: string) {
    return this.profilesService.findOneById(id)
  }

  @Query(() => [Profile])
  profiles() {
    return this.profilesService.query()
  }
}
