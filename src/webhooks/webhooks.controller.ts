import { Body, Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  async handleWebhook(@Body() event: any): Promise<any> {
    try {
      console.log(event)
      const { type, data } = event;

      // Manejo de los eventos
      switch (type) {
        case 'subscription.created':
          this.webhooksService.handleSubscriptionCreated(data);
          break;
        case 'subscription.updated':
          this.webhooksService.handleSubscriptionUpdated(data);
          break;
        case 'subscription.cancelled':
          this.webhooksService.handleSubscriptionCancelled(data);
          break;
        case 'payment.created':
          this.webhooksService.handlePaymentCreated(data);
          break;
        case 'payment.failed':
          this.webhooksService.handlePaymentFailed(data);
          break;
        default:
          console.log(`Evento no manejado: ${type}`);
          break;
      }

      return { status: 'success' };
    } catch (error) {
      console.log('Error al manejar el webhook:', error);
      return { status: 'error', message: error.message };
    }
  }
}
