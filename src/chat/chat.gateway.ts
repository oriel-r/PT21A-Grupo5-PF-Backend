import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit, UseGuards, } from '@nestjs/common';
import { ChatServiceGemini } from './chat-gemini.service';
import { WsAuthGuard } from 'src/guards/wsocket/socket-io.guard';
import { SockerWithUser } from 'src/helpers/SocketWithUser';


@WebSocketGateway({namespace: 'chat', cors: {orgin: ['*']}})
export class ChatGateway implements OnModuleInit{

  @WebSocketServer()
  server: Server

  constructor(
    private readonly geminiService: ChatServiceGemini
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket: SockerWithUser) => {
      try {
        const token = socket.handshake.auth.token
        console.log({onConnection: token})
        if (!token) throw new WsException("Token no encontrado o invalido al inicializar la conexion")
        const roomId = token.replace(/^"|"$/g, '')
      console.log({OnConnection: roomId})
        socket.join(roomId)
      } catch (error) {
        console.error('Error desconocido en conexión:', error)
        socket.emit('error', { message: "Error desconocido en conexión:" })
        socket.disconnect()
      }
    })
  }

 // @UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  async create(@ConnectedSocket() client: SockerWithUser, @MessageBody() data: any) {

    try {
      const token = client.handshake.auth.token
      if(!token) throw new WsException('No recibimos el token correctamente')
        const roomId = token.replace(/^"|"$/g, '')    
      console.log({inMessage: roomId})
      let response = await this.geminiService.handleMessage(roomId , data)
      console.log({response: response})
      this.server.to(roomId).emit( response)
    } catch(error) {
      console.error({message: "hubo un error", error})
    }

  }


}
