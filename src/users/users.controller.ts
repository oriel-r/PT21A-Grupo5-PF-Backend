import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Role } from 'src/enums/roles.enum';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: "By default's values: page 1, limit 5",
  })
  @HttpCode(HttpStatus.OK)
  @Get('page')
  findWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1,
    @Query('role') role: Role,
  ) {
    return this.usersService.pagination(page, limit, role);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Put(':id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const { oldPassword, newPassword, repeatPassword } = changePasswordDto;
    return await this.usersService.changePassword(id, {
      oldPassword,
      newPassword,
      repeatPassword,
    });
  }

  @Put('user-subscription/:id')
  async changeSubscription(
    @Param('id') userId: string,
    @Body() changeSubscriptionDto: ChangeSubscriptionDto,
  ) {
    const { subscriptionId } = changeSubscriptionDto;
    return await this.usersService.changeSubscription(userId, subscriptionId);
  }

  @Put('enroll/:id')
  @HttpCode(HttpStatus.OK)
  async enrollStudent(
    @Param('id') userId: string,
    @Body() enrollStudentDto: EnrollStudentDto,
  ) {
    const { courseId } = enrollStudentDto;
    await this.usersService.enrollStudent(userId, courseId);
  }

  @Put('assign-teacher/:id')
  async assignCourseToTeacher(
    @Param('id') teacherId: string,
    @Body() assignTeacherDto: AssignTeacherDto,
  ) {
    const { courseId } = assignTeacherDto;
    return this.usersService.assignTeacher(teacherId, courseId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
