import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { JwtAuthGuard } from '~/auth/jwt-auth.guard'
import { CurrentUser } from '~/users/current-user.decorator'
import { User } from '~/users/user.entity'
import { ChatRoomsService } from './chat-rooms.service'
import { Chat } from './entities/chat.entity'
import { CreateChatInput } from './dto/create-chat.input'
import { ChatRoom } from './entities/chat-room.entity'

@Resolver()
export class ChatRoomsResolver {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [ChatRoom])
  chatRooms(@CurrentUser() user: User) {
    return this.chatRoomsService.chatRooms(user)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ChatRoom)
  openChatRoom(@CurrentUser() user: User, @Args('userId') userId: string) {
    console.log(user.id, userId)
    return this.chatRoomsService.openChatRoom(user, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Chat)
  addChat(
    @CurrentUser() user: User,
    @Args('chatRoomId') chatRoomId: string,
    @Args('createChatInput') createChatInput: CreateChatInput,
  ) {
    return this.chatRoomsService.addChat(user, chatRoomId, createChatInput)
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => Chat)
  chatAdded(@CurrentUser() user: User, @Args('chatRoomId') chatRoomId: string) {
    return this.chatRoomsService.chatAdded(user, chatRoomId)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Chat])
  chats(@CurrentUser() user: User, @Args('chatRoomId') chatRoomId: string) {
    return this.chatRoomsService.chats(user, chatRoomId)
  }
}
