import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { Role } from 'src/enums/roles.enum';
import { hash, compare } from 'bcrypt';
import { SignupUserDto } from 'src/auth/dto/signup-auth.dto';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Auth0SignupDto } from 'src/auth/dto/auth0.dto';
import { UpdateUserAuthDto } from 'src/auth/dto/auth0.update.dto';
import { MembershipService } from 'src/membership/membership.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersRepo: UsersRepository,
    private readonly subscriptionService: SubscriptionsService,
    private readonly membershipService: MembershipService,
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
        'membership'
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
    const { name, email, password, idNumber, photo } = signUpUserDto;

    const subscription = await this.subscriptionService.findByName('standard');
    if (!subscription) {
      throw new BadRequestException('Suscripción no encontrada');
    }

    const existingUser = await this.findEmail(email);
    if (existingUser) {
      throw new ConflictException('Email ya existente.');
    }

    const existingIdNumber = await this.usersRepository.findOne({
      where: { idNumber },
    });
    if (existingIdNumber) {
      throw new HttpException(
        'El documento de identidad ya esta registrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.subscription = subscription;
    user.idNumber = idNumber;
    user.photo =
      photo ||
      'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg';

    await this.usersRepository.save(user);
  
    const newUser = await this.usersRepository.findOneBy({email: user.email})
    const newMembership = await this.membershipService.createMembership(newUser)
    console.log({userService: newMembership})
    await this.usersRepository.save(newUser)
    return await this.usersRepository.findOneBy({email: user.email})
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
    const userToUpdate = await this.findOne(id);
    if (!userToUpdate) {
      throw new BadRequestException('Usuario inexistente.');
    }

    const updatedUser = {
      ...userToUpdate,
      ...updateUserDto,
    };

    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async updateUserAuth0(id: string, updateUserAuthDto: UpdateUserAuthDto) {
    const userToUpdate = await this.findOne(id);
    if (!userToUpdate) {
      throw new BadRequestException('Usuario inexistente.');
    }

    const updatedUser = {
      ...userToUpdate,
      ...updateUserAuthDto,
    };

    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: string) {
    return await this.usersRepo.deleteUser(id);
  }

  async findEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { subscription: true },
    });
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword, repeatPassword } = changePasswordDto;
    const userToUpdate = await this.findOne(id);
    const isPasswordMatching = await compare(
      oldPassword,
      userToUpdate.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'El password no es correcto.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (newPassword !== repeatPassword) {
      throw new HttpException(
        'Las contraseñas no coinciden',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(newPassword, 10);

    userToUpdate.password = hashedPassword;

    await this.usersRepository.save(userToUpdate);

    return userToUpdate;
  }
}
