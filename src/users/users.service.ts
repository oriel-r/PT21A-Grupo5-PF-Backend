import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { Role } from 'src/enums/roles.enum';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersRepo: UsersRepository,
  ) {}

  async pagination(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return await this.usersRepository.find({
        select: ['id', 'idNumber', 'email', 'courses', 'createdAt', 'name', 'role', 'subscription'],
        skip: offset,
        take: limit,
    });
}

  async create(createUserDto: CreateUserDto) {
    const { name, email, idNumber } = createUserDto;
    const hashedPassword = await hash(idNumber, 10);
    const teacher = new User();
    teacher.name = name;
    teacher.email = email;
    teacher.password = hashedPassword;
    teacher.idNumber = idNumber;
    teacher.createdAt = new Date();
    teacher.role = Role.TEACHER;
    await this.usersRepository.save(teacher);
    return teacher;
  }

  async createUser( user: CreateUserDto ) {
    const existingUser = await this.findEmail(user.email)

    if( existingUser ) {
      throw new ConflictException('Email is already in use.')
    }

    return await this.usersRepository.save(user)
  }

  async findAll() {
    return await this.usersRepository.find({ relations: { courses: true } });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
