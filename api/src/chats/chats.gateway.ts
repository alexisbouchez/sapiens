import { Logger, UseGuards } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WsJwtAuthGuard } from '~/auth/ws-jwt-auth.guard'

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  private logger: Logger = new Logger('AppGateway')

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('clientToServer')
  handleMessage(client: any, payload: any): void {
    this.server.emit('serverToClient', payload)
  }

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }
}
