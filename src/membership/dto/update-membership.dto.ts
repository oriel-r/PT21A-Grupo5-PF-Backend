import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { PreApprovalRequest } from "mercadopago/dist/clients/preApproval/commonTypes";
import { PreApprovalResults } from "mercadopago/dist/clients/preApproval/search/types";
import { PreApprovalPlanCreateClient } from "mercadopago/dist/clients/preApprovalPlan/create/types";
import { DeepPartial } from "typeorm";

export class UpdateMembershipDto {

    @IsUUID()
    @IsNotEmpty()
    subs_id: string

    @ApiProperty({
        name: 'data',
        description: 'The nata for create subscription by Mercadopago'
    })
    @IsOptional()
    data: Partial<PreApprovalRequest>

}