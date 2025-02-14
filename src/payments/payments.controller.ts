import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

@Get()
async viewPayments() {
  return await this.paymentsService.viewPayments()
}
}
