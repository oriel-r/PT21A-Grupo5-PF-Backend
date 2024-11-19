import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {

    handleSubscriptionCreated(data: any) {
        console.log('Creación de suscripción:', data);
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
