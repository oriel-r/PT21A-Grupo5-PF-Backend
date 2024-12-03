import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {

    handleSubscriptionAuthroizedPayment(data: any) {
        console.log('subscription_authorized_payment', data);
      }
    
      handleSubscriptionUpdated(data: any) {
        console.log('Actualización de suscripción:', data);
      }
    
      handleSubscriptionCancelled(data: any) {
        console.log('Cancelación de suscripción:', data);
      }
    
      handlePaymentCreated(data: any) {
        console.log('Pago creado:', data);
      }
    
      handlePaymentFailed(data: any) {
        console.log('Pago fallido:', data);
      }
}
