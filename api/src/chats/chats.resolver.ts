import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Chat } from './chat.entity'
import { CreateChatInput } from './dto/create-chat.input'

const pubSub = new PubSub()

@Resolver()
export class ChatsResolver {
  @Mutation(() => Chat)
  async addChat(@Args('chat') createChatInput: CreateChatInput) {
    pubSub.publish('chatAdded', { chatAdded: createChatInput })
    return createChatInput
  }

  @Subscription(() => Chat)
  chatAdded() {
    return pubSub.asyncIterator('chatAdded')
  }
}
