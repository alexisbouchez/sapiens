import { Injectable, NotFoundException } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { PrismaService } from '~/prisma.service'
import { User } from '~/users/user.entity'
import { CreateChatInput } from './dto/create-chat.input'

const pubSub = new PubSub()

@Injectable()
export class ChatRoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async chatRooms(user: User) {
    const chatRooms = await this.prisma.chatRoom.findMany({
      where: { participants: { some: { id: user.id } } },
      select: {
        id: true,
        participants: {
          select: { id: true, email: true },
          where: { id: { not: { equals: user.id } } },
        },
      },
    })

    return chatRooms.map((chatRoom) => ({
      id: chatRoom.id,
      otherUserEmail: chatRoom.participants[0].email,
    }))
  }

  async openChatRoom(user: User, userId: string) {
    const chatRoom = await this.prisma.chatRoom.findFirst({
      where: {
        participants: { some: { AND: [{ id: user.id }, { id: userId }] } },
      },
    })

    if (!chatRoom) {
      return this.createChatRoom(user, userId)
    }

    return { id: chatRoom.id }
  }

  async createChatRoom(user: User, userId: string) {
    const chatRoom = await this.prisma.chatRoom.create({
      data: {
        participants: { connect: [{ id: user.id }, { id: userId }] },
      },
    })

    return { id: chatRoom.id }
  }

  private async checkUserIsInChatRoom(user: User, chatRoomId: string) {
    const chatRoom = await this.prisma.chatRoom.findUnique({
      where: { id: chatRoomId },
      select: { participants: { select: { id: true } } },
    })

    if (!chatRoom) {
      throw new NotFoundException()
    }

    const userFoundInParticipants = chatRoom.participants.find(
      (participant) => participant.id === user.id,
    )

    if (!userFoundInParticipants) {
      throw new NotFoundException()
    }
  }

  async addChat(
    user: User,
    chatRoomId: string,
    createChatInput: CreateChatInput,
  ) {
    await this.checkUserIsInChatRoom(user, chatRoomId)

    const chatAdded = await this.prisma.chat.create({
      data: {
        ...createChatInput,
        chatRoom: { connect: { id: chatRoomId } },
        user: { connect: { id: user.id } },
      },
    })

    pubSub.publish(`chatAdded/${chatRoomId}`, { chatAdded })

    return createChatInput
  }

  async chatAdded(user: User, chatRoomId: string) {
    await this.checkUserIsInChatRoom(user, chatRoomId)

    return pubSub.asyncIterator(`chatAdded/${chatRoomId}`)
  }

  async chats(user: User, chatRoomId: string) {
    await this.checkUserIsInChatRoom(user, chatRoomId)

    return this.prisma.chat.findMany({
      where: { chatRoom: { id: chatRoomId } },
    })
  }
}
