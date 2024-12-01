import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { OnModuleInit, UseGuards, } from '@nestjs/common';
import { ChatServiceGemini } from './chat-gemini.service';
import { WsAuthGuard } from 'src/guards/wsocket/socket-io.guard';
import { SockerWithUser } from 'src/helpers/SocketWithUser';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway implements OnModuleInit{

  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService,
    private readonly geminiService: ChatServiceGemini
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket: SockerWithUser) => {

      const token = socket.handshake.headers.authorization.split(' ')[1]
      if (token) {  
        socket.join(token)
      } else {
        console.log('disconected')
        socket.disconnect()
        socket.on('disconnect', () => console.log('Cliente desconectado'))
      }
    })
  }

 // @UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  async create(@ConnectedSocket() client: SockerWithUser, @MessageBody() data: any) {

    const roomId = client.handshake.headers.authorization.split(' ')[1]
    const language = client.handshake.query?.language as string || 'ingles'
    
    let response = await this.geminiService.handleMessage(roomId, language , data)


    this.server.to(roomId).emit('response-message', response)

  }


}
