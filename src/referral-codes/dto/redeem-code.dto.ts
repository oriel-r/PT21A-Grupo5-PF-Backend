import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { DeepPartial } from "typeorm";

export class RedeemCodeDto {
    @ApiProperty({
        description: 'The ID of the user redeeming the referral code.',
        example: 'd5a7d4f2-cb38-4d3c-b5d7-cbadafa98f77',
        type: 'string',
      })
    @IsNotEmpty()
    @IsUUID()
    userId: string
    
    @ApiProperty({
        description: 'The referral code the user is redeeming.',
        example: 'ABCD1234',
        type: 'string',
      })
    @IsString()
    @IsNotEmpty()
    code: string

    constructor(userId, code) {
        Object.assign(this, userId, code)
    }
}