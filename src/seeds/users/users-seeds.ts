import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { usersMock } from './users-mock';
import { hash } from 'bcrypt';

@Injectable()
export class UsersSeed {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async seed() {
    for (const userData of usersMock) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: userData.email },
      });

      const hashedPassword = await hash(userData.password, 10);

      if (!existingUser) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = hashedPassword;
        user.idNumber = userData.idNumber;
        user.role = userData.role;
        user.createdAt = new Date();
        await this.usersRepository.save(user);
      }
    }
  }
}
