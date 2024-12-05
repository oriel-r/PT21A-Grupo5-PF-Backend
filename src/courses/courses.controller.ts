import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  HttpCode,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  BadRequestException,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { RateCourseDto } from './dto/rate-course.dto';
import { FilterCourses } from 'src/helpers/Filter';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('Courses') // Grouping all endpoints under "Courses" in Swagger
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({
    summary: 'Get all courses with pagination',
    description: 'Retrieve courses with pagination. Defaults: page 1, limit 5.',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Number of items per page (default: 5)',
  })
  @HttpCode(HttpStatus.OK)
  @Get('page')
  async getPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return await this.coursesService.getPagination(page, limit);
  }

  @ApiOperation({ summary: 'Create a new course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/jpg',
          'video/mp4',
          'video/mpeg',
          'video/webm',
          'video/x-msvideo',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Invalid file type'), false);
        }
      },
      limits: { fileSize: 200000000 },
    }),
  )
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() data: CreateCourseDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const [img_file, video_file] = files;
    return await this.coursesService.create(data, img_file, video_file);
  }

  @ApiOperation({ summary: 'Filter courses' })
  @ApiQuery({
    name: 'filters',
    required: false,
    description:
      'Filter parameters like date range, level, specialization, etc.',
  })
  @Get('filter')
  async findAllByDate(@Query() filters: FilterCourses) {
    return await this.coursesService.findAll(filters);
  }

  @ApiOperation({
    summary: 'Rate a course',
    description:
      'Allows a user to rate a course by providing the course ID, user ID, and the number of stars.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the course to rate',
    type: 'string',
    example: 'e6bfb1c7-8c3c-4d9f-a1ec-9f1bb9b2e252',
  })
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':id/rate')
  async rateCourse(
    @Param('id') courseId: string,
    @Body() rateCourseDto: RateCourseDto,
  ) {
    const { userId, stars } = rateCourseDto;
    return this.coursesService.rateCourse(courseId, userId, stars);
  }

  @ApiOperation({ summary: 'Get details of a specific course' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the course to retrieve',
    type: 'string',
    example: 'e6bfb1c7-8c3c-4d9f-a1ec-9f1bb9b2e252',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @ApiOperation({
    summary: 'Upload a course video',
    description: 'Upload a video file for a specific course.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the course to upload the video for',
    type: 'string',
    example: 'e6bfb1c7-8c3c-4d9f-a1ec-9f1bb9b2e252',
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.coursesService.updateVideo(id, file);
  }

  @ApiOperation({ summary: 'Update a course' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the course to update',
    type: 'string',
    example: 'e6bfb1c7-8c3c-4d9f-a1ec-9f1bb9b2e252',
  })
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete a course' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the course to delete',
    type: 'string',
    example: 'e6bfb1c7-8c3c-4d9f-a1ec-9f1bb9b2e252',
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
