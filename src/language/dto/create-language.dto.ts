import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class CreateLanguageDto {
  @ApiProperty({
    type: String,
    title: 'path',
    description: 'atribute for get a language',
    example: 'russian',
  })
  @IsNotEmpty()
  @IsString()
  path: string;

  @ApiProperty({
    name: 'name',
    description: 'language name',
    example: 'Guarani',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    title: 'General description',
    description: 'General description of the language.',
  })
  @IsString()
  @IsNotEmpty()
  general_description: string;

  @ApiProperty({
    name: 'brief_description',
    description: 'A short description',
  })
  @IsString()
  @IsNotEmpty()
  brief_description: string;

  @ApiProperty({
    name: 'image_url',
    description: 'A reference image of the language',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({
    name: 'flag_url',
    description: 'A reference image of the flag',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  flag_url?: string;

  @ApiProperty({
    name: 'country_photo',
    description: 'a photo from a city or place in this country',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  country_photo_url?: string;

  constructor(partial: DeepPartial<CreateLanguageDto>) {
    Object.assign(this, partial);
  }
}
