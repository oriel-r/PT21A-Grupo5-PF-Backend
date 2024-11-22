import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangeSubscriptionDto {
    @ApiProperty({type:String,
        description: 'Id of subscription to change'
    })
    @IsString()
    @IsNotEmpty()
    subscriptionId:string
}