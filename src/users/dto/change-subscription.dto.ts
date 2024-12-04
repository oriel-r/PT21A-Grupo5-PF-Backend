import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ChangeSubscriptionDto {
  @ApiProperty({
    type: String,
    description: 'ID of the new subscription to assign to the user.',
    example: 'e8c51d26-1b0d-4b12-9c67-2f4d9a0b2c5f', // Example UUID
  })
  @IsUUID()
  @IsNotEmpty()
  subscriptionId: string;
}
