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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of users per page',
    required: false,
    example: 5,
  })
  @ApiQuery({
    name: 'role',
    enum: Role,
    description: 'Role filter for users',
    required: false,
    example: Role.USER,
  })
  @HttpCode(HttpStatus.OK)
  @Get('page')
  async findWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1,
    @Query('role') role: Role,
  ) {
    const users = await this.usersService.pagination(page, limit, role);
    return users.map((user) => new UserResponseDto(user));
  }

  @ApiOperation({
    summary: 'Create a new teacher.',
  })
  @ApiResponse({
    status: 201,
    description: 'Teacher successfully created',
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new UserResponseDto(user);
  }

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users',
  })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get a user by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a single user',
    type: UserResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new UserResponseDto(user);
  }

  @ApiOperation({
    summary: 'Update a user',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserResponseDto,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserResponseDto(user);
  }

  @ApiOperation({
    summary: 'Change user password',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Password successfully changed',
  })
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

  @ApiOperation({
    summary: 'Change user subscription',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription successfully changed',
  })
  @Put('user-subscription/:id')
  async changeSubscription(
    @Param('id') userId: string,
    @Body() changeSubscriptionDto: ChangeSubscriptionDto,
  ) {
    const { subscriptionId } = changeSubscriptionDto;
    return await this.usersService.changeSubscription(userId, subscriptionId);
  }

  @ApiOperation({
    summary: 'Enroll a student in a course',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user (student)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Student successfully enrolled in the course',
  })
  @Put('enroll/:id')
  @HttpCode(HttpStatus.OK)
  async enrollStudent(
    @Param('id') userId: string,
    @Body() enrollStudentDto: EnrollStudentDto,
  ) {
    const { courseId } = enrollStudentDto;
    await this.usersService.enrollStudent(userId, courseId);
  }

  @ApiOperation({
    summary: 'Assign a teacher to a course',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the course',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Teacher successfully assigned to the course',
  })
  @Put('assign-teacher/:id')
  async assignCourseToTeacher(
    @Param('id') courseId: string,
    @Body() assignTeacherDto: AssignTeacherDto,
  ) {
    const { teacherId } = assignTeacherDto;
    return this.usersService.assignTeacher(teacherId, courseId);
  }

  @ApiOperation({
    summary: "Set user's isActive to false",
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to be deactivated',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully deactivated',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
