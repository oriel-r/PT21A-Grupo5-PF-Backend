import {
  Body,
  Controller,
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

@ApiTags('lessons')
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
    summary: 'Create a Lesson',
    description: "Send course's titlte",
  })
  @Post()
  async createCourse(@Body() data: CreateLessonDto) {
    return await this.lessonsService.create(data);
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
  @Put(':id')
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
}
