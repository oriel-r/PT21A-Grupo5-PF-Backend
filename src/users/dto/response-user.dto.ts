import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the user.',
    example: 'e8c51d26-1b0d-4b12-9c67-2f4d9a0b2c5f',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the user.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email address of the user.',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Personal identification number of the user.',
    example: '123456789',
  })
  idNumber: string;

  @ApiProperty({
    type: Date,
    description: 'Timestamp when the user was created.',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'Role of the user.',
    example: 'USER',
  })
  role: string;

  @ApiProperty({
    type: String,
    description: 'Membership type associated with the user.',
    example: 'premium',
  })
  membership: string;

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, idNumber, createdAt, role, membership } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.idNumber = idNumber;
    this.createdAt = createdAt;
    this.role = role;
    this.membership = membership;
  }
}
