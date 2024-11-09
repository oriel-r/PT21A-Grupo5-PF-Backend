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

@ApiTags('Languages')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({
    summary: 'Get all languages',
    description: "By default's values: page 1, limit 5",
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.languageService.getAll(page, limit);
  }

  @Post()
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
  async addLanguage(
    @Body() data: CreateLanguageDto,
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
    return await this.languageService.addLanguage(data, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateLanguage(
    @Param() id: string,
    @Body() data: CreateLanguageDto,
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
    return await this.languageService.update(id, data, file);
  }

  @Delete(':id')
  async deleteLanguage(@Param() id: string) {
    return await this.languageService.delete(id);
  }
}
