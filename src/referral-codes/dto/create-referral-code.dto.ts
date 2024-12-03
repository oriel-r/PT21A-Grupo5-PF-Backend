import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID, IsString, Min, Max } from 'class-validator';

export class CreateReferralCodeDto {
  @ApiProperty({
    description: 'The number of referral codes to create.',
    example: 10,
    type: 'integer',
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'The ID of the user issuing the referral codes.',
    example: 'd5a7d4f2-cb38-4d3c-b5d7-cbadafa98f77',
    type: 'string',
  })
  @IsUUID()
  issuer: string;

  @ApiProperty({
    description: 'The discount percentage applied for each referral code.',
    example: 20,
    type: 'integer',
    minimum: 1,
    maximum: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100) // Adjust based on your discount policy
  discount: number;

  @ApiProperty({
    description: 'The number of days until the referral code expires.',
    example: 30,
    type: 'integer',
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  @IsInt()
  @IsPositive()
  expiration: number; // Days until expiration
}
