import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/pipes/file/file.pipe';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({
    summary: 'Get all lessons',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getall(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.lessonsService.getAllLessons(page, limit);
  }

  @ApiOperation({
    summary: 'Get lessons by courseId',
  })
  @Get('by-course/:id')
  async getLessonsByCourse(
    @Param('id') courseId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;

    return await this.lessonsService.getAllLessonsByCourse(
      courseId,
      pageNum,
      limitNum,
    );
  }

  @ApiOperation({
    summary: 'Create a Lesson',
    description: "Send course's titlte",
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
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createLesson(
    @Body() data: CreateLessonDto,
    @UploadedFile(
      new FilePipe(0, 50000000, [
        'video/mp4',
        'video/mpeg',
        'video/webm',
        'video/x-msvideo',
      ]),
    )
    file: Express.Multer.File,
  ) {
    return await this.lessonsService.create(data, file);
  }

  @ApiOperation({
    summary: 'Create a lesson',
    description: "Send course's title",
  })
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
  @Put(':id/upload')
  async create(
    @Param() id: string,
    @UploadedFile(
      new FilePipe(0, 50000, [
        'video/mp4',
        'video/mpeg',
        'video/webm',
        'video/x-msvideo',
      ]),
    )
    file: Express.Multer.File,
  ) {
    return this.lessonsService.uploadVideo(id, file);
  }

  @ApiOperation({
    summary: 'Edit lesson',
    description: 'Modify lesson data',
  })
  @Put(':id')
  async updateLesson(@Param('id') id: string, @Body() data: UpdateLessonDto) {
    return await this.lessonsService.updateLesson(id, data);
  }

  @ApiOperation({
    summary: 'Delete a lesson',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.lessonsService.delete(id);
  }
}
