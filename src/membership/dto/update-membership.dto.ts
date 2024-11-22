import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateMembershipDto {

    @IsUUID()
    @IsNotEmpty()
    subs_id: string

    @ApiProperty({
        name: 'data',
        description: 'The nata for create subscription by Mercadopago'
    })
    @IsOptional()
    vaucher: string

}