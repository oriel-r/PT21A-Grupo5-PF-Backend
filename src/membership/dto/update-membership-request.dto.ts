import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateMembershipDto {

    @ApiProperty({
        name: 'subs_id',
        description: 'the uuid from new subscription'
    })
    @IsUUID()
    @IsNotEmpty()
    subs_id: string

    @ApiProperty({
        name: 'vaucher',
        description: 'A referral code'
    })
    @IsOptional()
    vaucher: string

}