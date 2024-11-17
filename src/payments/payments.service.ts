import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
    constructor(private readonly paymentsRepository: PaymentsRepository) {}

    async viewPayments(): Promise<Payment[]> {
        const result = await this.paymentsRepository.getAll()
        if(!result) throw new NotFoundException('No se encuentran pagos cargados')
        return result
    }

    async addPayment(data): Promise<Payment> {
        return await this.paymentsRepository.create(data)
    }

    async updatePayment(id: string, data) {
        const payment = await this.paymentsRepository.findOne(id)
        if(!payment) throw new NotFoundException('El id eviado es erroneo o el pago no existe')
        await this.paymentsRepository.update(id, data)
        return await this.paymentsRepository.findOne(id)
    }
}
