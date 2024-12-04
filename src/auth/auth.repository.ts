import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserVerification } from "./entities/user-verification.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(UserVerification)
        private readonly userVerificationRepository: Repository<UserVerification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createVerificationCode(email: string, code: string, expiresAt: Date) {
        const verification = this.userVerificationRepository.create({ email, code, expiresAt});
        return this.userVerificationRepository.save(verification);
    }

    async findVerificationCode(email: string, code: string) {
        return this.userVerificationRepository.findOne({ where: { email, code }});
    }

    async deleteVerificationCode(id: string) {
        await this.userVerificationRepository.delete(id);
    }

    async activateUser(email: string) {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
        throw new Error('Usuario no encontrado');
        }

        if (user.isVerified) {
            throw new Error('El usuario ya está activado');
        }

    
        return await this.userRepository.update(user.id, {isVerified: true}); 
    }

}