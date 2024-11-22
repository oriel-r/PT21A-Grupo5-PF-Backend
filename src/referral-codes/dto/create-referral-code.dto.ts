import { IsInt, IsPositive, IsUUID, IsString, Min, Max } from 'class-validator';

export class CreateReferralCodeDto {
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsUUID()
  issuer: string;

  @IsInt()
  @Min(1)
  @Max(100) // Adjust based on your discount policy
  discount: number;

  @IsInt()
  @IsPositive()
  expiration: number; // Days until expiration
}
