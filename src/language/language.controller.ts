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
import { LanguageService } from './language.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLanguageDto } from './dto/create-language.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/pipes/file/file.pipe';
import { FilterCourses } from 'src/helpers/Filter';
import { UpdateLanguageDto } from './dto/update-language.dto';

@ApiTags('Languages')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({
    summary: 'Get all languages',
    description: "By default's values: page 1, limit 5",
  })
  @HttpCode(HttpStatus.OK)
  @Get('page')
  async getPagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.languageService.getPagination(page, limit);
  }

  @Get()
  async getAll() {
    return await this.languageService.getAll();
  }

  @Get(':path/courses')
  async getAndFilter(
    @Param('path') path: string,
    @Query() filters: FilterCourses,
  ) {
    return await this.languageService.getAndFilter(path, filters);
  }

  @ApiOperation({
    summary: 'Get a language courses',
  })
  @Get(':id/courses')
  async getById(id: string) {
    return await this.languageService.getCoursesFromLanguage(id);
  }

  @ApiOperation({ summary: 'Create language' })
  @Post('create')
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    const { path, name, general_description, brief_description } =
      createLanguageDto;
    return await this.languageService.addLanguage({
      path,
      name,
      general_description,
      brief_description,
    });
  }

  @Put('id:/flag_url')
  @ApiOperation({
    summary: 'Add a new language',
    description: 'This endpoint acepto send files with multipart',
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
  @HttpCode(HttpStatus.OK)
  async updateFlagg(
    @Param('id') id: string,
    @UploadedFile(
      new FilePipe(0, 2000, [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/jpg',
      ]),
    )
    file: Express.Multer.File,
  ) {
    return await this.languageService.addFlag(id, file);
  }

  @Put(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('id') id: string,
    @UploadedFile(
      new FilePipe(0, 2000, [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/jpg',
      ]),
    )
    file?: Express.Multer.File | undefined,
  ) {
    return await this.languageService.addImage(id, file);
  }

  @Put(':id/country_photo')
  @UseInterceptors(FileInterceptor('file'))
  async updateCountryPhoto(
    @Param('id') id: string,
    @UploadedFile(
      new FilePipe(0, 2000, [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/jpg',
      ]),
    )
    file?: Express.Multer.File | undefined,
  ) {
    return await this.languageService.addCountryPhoto(id, file);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return await this.languageService.updateLanguage(id, updateLanguageDto);
  }

  @Delete(':id')
  async deleteLanguage(@Param() id: string) {
    return await this.languageService.delete(id);
  }
}
