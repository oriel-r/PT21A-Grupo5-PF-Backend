import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Membership } from "./entities/membership.entity";
import { DeepPartial, Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class MembershipRepostory {
    constructor(
        @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>
    ) {}

    async getAll(): Promise<Membership[]> {
        return await this.membershipRepository.find({relations: {user:true, subscription: true, payments: true}})
    }

    async getById(id: string) {
        return await this.membershipRepository.findOne({where: {id}, relations: {user: true, subscription: true, payments: true}})
    }

    async gerByUser(user: User) {
        return await this. membershipRepository.findOne({
            where: {user},
            relations: {user: true, subscription: true, payments: true}
        })
    }

    async create(data:DeepPartial<Membership>):Promise<Membership> {
        const result = await this.membershipRepository.save(this.membershipRepository.create(data))
        return result
    }

    async updateMembership(id: string, data) {
        return await this.membershipRepository.update(id, data)
    }

    async save(membership:Membership):Promise<void> {
        await this.membershipRepository.save(membership)
    }

    
}