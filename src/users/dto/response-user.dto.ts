import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    type: User,
    description:
      'A response DTO in which shows the user properties without the password.',
  })
  id: string;
  name: string;
  email: string;
  idNumber: string;
  createdAt: Date;
  role: string;
  membership:string

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, idNumber, createdAt, role, membership } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.idNumber = idNumber;
    this.createdAt = createdAt;
    this.role = role;
    this.membership = membership
  }
}
