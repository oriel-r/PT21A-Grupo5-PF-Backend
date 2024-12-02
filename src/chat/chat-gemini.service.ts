import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GoogleGenerativeAI, } from '@google/generative-ai';
import { Socket } from 'socket.io';

@Injectable()
export class ChatServiceGemini {
  private chatHistory = new Map<string, string[]>();
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
  ) {
     const apiKey = this.configService.get<string>('GEMIANIAI_API_KEY');
    if (!apiKey) {

      throw new Error('GEMIANIAI_API_KEY no está configurado en las variables de entorno.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async handleMessage(userId: string, language: string, message: string, ) {
    const context = this.getOrCreateContext(userId);
    context.push(`Usuario: ${message}`);
    const response = await this.getAIResponse( language, context,);

    context.push(`Profesor: ${response}`);
    this.chatHistory.set(userId, context);

    return response;
  }

  private getOrCreateContext(userId: string) {
    if (!this.chatHistory.has(userId)) {
      this.chatHistory.set(userId, []);
    }
    return this.chatHistory.get(userId)!;
  }

  private async getAIResponse( language: string, context: string[]) {
    const prompt = `Eres un profesor experto en ${language}. Ayuda a los estudiantes de forma interactiva, responde en español. 
    Contexto actual: ${context.join('\n')}
    Si bien este es el contexto actual no es necesario que me respondas todo cada vez que te pregunto algo, responde la ultima pregunta y solo algo del contexto si te lo indico
    `;
  
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hola" }],
          },
          {
            role: "model",
            parts: [{ text: "Un gusto conocer, que te gustaria saber ahora?" }],
          },
        ],
      });
  
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error al generar la respuesta:', error);
      return 'Hubo un error al procesar la solicitud.';
    }
  }

}




