import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer() server: Server;
  onModuleInit() {
    this.server.on('conncetion', (client) => {
      console.log(`client connected with id ${client.id}`);
    });
  }
  @SubscribeMessage('newSentMessage')
  newSentMessage(@MessageBody() data: string) {}
}
