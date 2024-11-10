import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { Role } from 'src/enums/roles.enum';
import { hash } from 'bcrypt';
import { SignupUserDto } from 'src/auth/dto/signup-auth.dto';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersRepo: UsersRepository,
    private readonly subscriptionService: SubscriptionsService,
  ) {}

  async pagination(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return await this.usersRepository.find({
      relations: { courses: true, subscription: true },
      select: [
        'id',
        'idNumber',
        'email',
        'courses',
        'createdAt',
        'name',
        'role',
        'subscription',
      ],
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

  async createUser(signUpUserDto: SignupUserDto) {
    const { name, email, password, idNumber } = signUpUserDto;
    const subscription = await this.subscriptionService.findByName('standard');
    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }
    const existingUser = await this.findEmail(email);

    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.subscription = subscription
    user.idNumber = idNumber

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({ relations: { courses: true } });
  }

  async findNewsletterList(): Promise<Array<string>> {
    return this.usersRepo.findNewsletterList();
  }

  async findOne(id: string) {
    return await this.usersRepo.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepo.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.usersRepo.deleteUser(id);
  }

  async findEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
