import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { DeepPartial } from "typeorm";

export class RedeemCodeDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsString()
    @IsNotEmpty()
    code: string

    constructor(userId, code) {
        Object.assign(this, userId, code)
    }
}