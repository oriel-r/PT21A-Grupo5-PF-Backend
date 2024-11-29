import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-verifications')
export class UserVerification {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    code: string;

    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    CreatedAt: Date;
}