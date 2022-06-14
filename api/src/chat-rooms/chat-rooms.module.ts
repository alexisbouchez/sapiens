import { Module } from '@nestjs/common'
import { PrismaService } from '~/prisma.service'
import { UsersModule } from '~/users/users.module'
import { ChatRoomsResolver } from './chat-rooms.resolver'
import { ChatRoomsService } from './chat-rooms.service'

@Module({
  imports: [UsersModule],
  providers: [ChatRoomsResolver, ChatRoomsService, PrismaService],
})
export class ChatRoomsModule {}
