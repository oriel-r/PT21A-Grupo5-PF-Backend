import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatServiceGemini {
  private chatHistory = new Map<string, string[]>();
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    const apiKey = this.configService.get<string>('GEMIANIAI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMIANIAI_API_KEY no está configurado en las variables de entorno.');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async handleMessage(userId: string, language: string, message: string) {
    const context = this.getOrCreateContext(userId);
    context.push(`Usuario: ${message}`);

    const response = await this.getAIResponse(language, context);

    context.push(`Profesor: ${response}`);
    this.chatHistory.set(userId, context);

    this.eventEmitter.emit('chat.response', { userId, response });

    return response;
  }

  private getOrCreateContext(userId: string) {
    if (!this.chatHistory.has(userId)) {
      this.chatHistory.set(userId, []);
    }
    return this.chatHistory.get(userId)!;
  }

  private async getAIResponse(language: string, context: string[]) {
    const prompt = `Eres un profesor experto en ${language}. Ayuda a los estudiantes de forma interactiva, responde en español. 
    Contexto actual: ${context.join('\n')}`;

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(prompt);

      if (result.response && result.response.candidates && result.response.candidates.length > 0) {
        if (result.response.candidates.length > 1) {
          console.warn(`Esta respuesta tiene ${result.response.candidates.length} candidatos. Se está devolviendo el texto del primer candidato.`);
        }

        return result.response.candidates[0]?.content || 'Lo siento, no tengo una respuesta en este momento.';
      }

      return 'Lo siento, no tengo una respuesta en este momento.';
    } catch (error) {
      console.error('Error al generar la respuesta:', error);
      return 'Hubo un error al procesar la solicitud.';
    }
  }
}




