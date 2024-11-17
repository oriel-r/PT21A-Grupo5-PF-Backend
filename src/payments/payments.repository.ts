import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Membership } from 'src/membership/entities/membership.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async getAll() {
    return await this.paymentRepository.find()
  }

  async create(data: Membership): Promise<Payment>{
    console.log(data)
    const result = await this.paymentRepository.save(this.paymentRepository.create(data))
    console.log(result) 
    return result
  }

  async findOne(id: string) {
    return await this.paymentRepository.findOneBy({id})
  }

  async update(id, data) {
    return await this.paymentRepository.update(id, data)
  }
}
