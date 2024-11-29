import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatServiceGemini } from './chat-gemini.service';

@Module({
  providers: [ChatGateway, ChatService, ChatServiceGemini],
})
export class ChatModule {}
