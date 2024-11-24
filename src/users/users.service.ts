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
import { MembershipService } from 'src/membership/membership.service';
import { Membership } from 'src/membership/entities/membership.entity';
import { allowedNodeEnvironmentFlags } from 'process';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersRepo: UsersRepository,
    private readonly subscriptionService: SubscriptionsService,
    private readonly membershipService: MembershipService,
  ) {}

  async pagination(page: number, limit: number, role) {
    const offset = (page - 1) * limit;

    if (!Object.values(Role).includes(role))
      throw new BadRequestException('El rol enviado es incorrecto');

    return await this.usersRepository.find({
      where: { role: role },
      relations: { courses: true, membership: { subscription: true }, redeemedReferralCode:true },
      select: [
        'id',
        'idNumber',
        'email',
        'courses',
        'createdAt',
        'name',
        'role',
        'membership',
        'isActive',
        'photo',
        'redeemedReferralCode'
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

    const subscription = await this.subscriptionService.findByName('Standard');
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
    user.idNumber = idNumber;
    user.photo =
      photo ||
      'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg';

    await this.usersRepository.save(user);
    const membership: Membership =
      await this.membershipService.createMembership(user);
    console.log({ inUser: membership });
    user.membership = membership;
    await this.usersRepository.save(user);
    return user;
  }

  async createUserFromAuth0(auth0Dto: Auth0SignupDto) {
    const { email, name, photo } = auth0Dto;

    const user = new User();
    (user.email = email),
      (user.name = name),
      (user.photo =
        photo ||
        'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg'),
      (user.password = uuid()),
      (user.idNumber = uuid()),
      await this.usersRepository.save(user);
    const membership: Membership =
      await this.membershipService.createMembership(user);
    user.membership = membership;
    await this.usersRepository.save(user);

    return user;
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        courses: true,
        membership: { subscription: true, payments: true },
      },
    });
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

  async changeSubscription(userId: string, subscriptionId: string) {
    const userToUpdate = await this.findOne(userId);
    if (!userToUpdate) {
      throw new BadRequestException('Usuario inexistente.');
    }
    const subscriptionToChange =
      await this.subscriptionService.findOne(subscriptionId);
    if (!subscriptionToChange) {
      throw new BadRequestException('Subscripción inexistente.');
    }
    const membership = userToUpdate.membership
    membership.subscription = subscriptionToChange
    await this.membershipService.saveMembership(membership)

   
    return userToUpdate;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Usuario inexistente.');
    }
    user.isActive = false;
    await this.usersRepository.save(user);
    console.log(`El usuario ${user.email} ha sido eliminado con éxito.`);

    return { message: `Usuario ${user.email} eliminado con éxito`, user };
  }

  async findEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { membership: { subscription: true } },
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
