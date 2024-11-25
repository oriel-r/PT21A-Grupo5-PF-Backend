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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { RateCourseDto } from './dto/rate-course.dto';
import { FilterCourses } from 'src/helpers/Filter';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({
    summary: 'Get all courses',
    description: "By default's values: page 1, limit 5",
  })
  @HttpCode(HttpStatus.OK)
  @Get('page')
  async getPagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.coursesService.getPagination(page, limit);
  }

  @ApiOperation({
    summary: 'Create a new course',
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
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
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCourseDto,
  ) {
    return await this.coursesService.create(data, file);
  }

  @Get('filter')
  async findAllByDate(@Query() filters: FilterCourses) {
    return await this.coursesService.findAll(filters);
  }

  @ApiOperation({
    summary: 'Rate a course',
    description:
      'Allows a user to rate a course by providing the course ID, user ID, and the number of stars.',
  })
  @Post(':id/rate')
  async rateCourse(
    @Param('id') courseId: string,
    @Body() rateCourseDto: RateCourseDto,
  ) {
    const { userId, stars } = rateCourseDto;
    return this.coursesService.rateCourse(courseId, userId, stars);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
