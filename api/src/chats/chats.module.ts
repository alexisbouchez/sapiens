import { Module } from '@nestjs/common'
import { ChatsGateway } from './chats.gateway'
import { ChatsResolver } from './chats.resolver';

@Module({
  providers: [ChatsGateway, ChatsResolver],
})
export class ChatsModule {}
