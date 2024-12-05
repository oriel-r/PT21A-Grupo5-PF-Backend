import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { Payment } from './entities/payment.entity';
import { Membership } from 'src/membership/entities/membership.entity';
import { PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes';

@Injectable()
export class PaymentsService {
    constructor(private readonly paymentsRepository: PaymentsRepository) {}

    async viewPayments(): Promise<Payment[]> {
        const result = await this.paymentsRepository.getAll()
        if(!result) throw new NotFoundException('No se encuentran pagos cargados')
        return result
    }

    async addPayment(membership: Membership, apiReponse: PreApprovalResponse): Promise<Payment> {
        const data: Partial<Payment> = {membership, status: apiReponse.status, amount: apiReponse.auto_recurring.transaction_amount}
        return await this.paymentsRepository.create(data)
    }

    async updatePayment(id: string, data) {
        const payment = await this.paymentsRepository.findOne(id)
        if(!payment) throw new NotFoundException('El id eviado es erroneo o el pago no existe')
        await this.paymentsRepository.update(id, data)
        return await this.paymentsRepository.findOne(id)
    }
}
