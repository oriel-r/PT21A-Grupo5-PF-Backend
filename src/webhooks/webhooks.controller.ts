import { Body, Controller, Post, Query } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  async handleWebhook(
    @Query() event: any,
    @Body() data: any
  ): Promise<any> {
    try {
      console.log(event)
      const { type } = event

      // Manejo de los eventos
      switch (type) {
        case 'subscription_authorized_payment':
          this.webhooksService.handleSubscriptionAuthroizedPayment(data);
          break;
        case 'subscription.updated':
          this.webhooksService.handleSubscriptionUpdated(data);
          break;
        case 'subscription.cancelled':
          this.webhooksService.handleSubscriptionCancelled(data);
          break;
        case 'payment':
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
