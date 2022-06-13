import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { JwtAuthGuard } from '~/auth/jwt-auth.guard'
import { CurrentUser } from '~/users/current-user.decorator'
import { Chat } from './chat.entity'
import { CreateChatInput } from './dto/create-chat.input'

const pubSub = new PubSub()

@Resolver()
export class ChatsResolver {
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Chat)
  async addChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    pubSub.publish('chatAdded', { chatAdded: createChatInput })
    return createChatInput
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => Chat)
  chatAdded(@CurrentUser() user: any) {
    console.log(user)
    return pubSub.asyncIterator('chatAdded')
  }
}
