import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/guards/wsocket/socket-io.guard';
import { DeepPartial } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ChatServiceGemini } from './chat-gemini.service';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService,
    private readonly geminiService: ChatServiceGemini
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {

      const roomId = socket.id

      console.log(socket.id)

      socket.join(roomId)

      socket.on('disconnect', () => console.log('Cliente desconectado'))

    })
  }

  //@UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  async create(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    let userMock: DeepPartial<User> = {}

    const token = client.handshake.headers.authorization
    
    if(token === '1234' ) {
      userMock = {
        id: '12345678',
        coursesToTake: [
          {
            language: {
              name: 'ingles'
            } 
          }
        ]
      }
    }

    if(token === '5678' ) {
      userMock = {
        id: '87654321',
        coursesToTake: [
          {
            language: {
              name: 'guarani'
            } 
          }
        ]
      }
    }

    const roomId = userMock.id

    const response = await this.geminiService.handleMessage(userMock.id, userMock.coursesToTake[0].language.name , data)

   // console.log(response)

    this.server.to(roomId).emit(data)
    console.log({room: roomId, data})



    this.server.to(roomId).emit('response', response[0])
  }


}
