import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'Create a new category',
    description: 'Creates a new category using the provided name.',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Get all categories',
    description: 'Retrieves a list of all categories.',
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a specific category by ID',
    description: 'Fetches details of a single category using its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category.',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a category by ID',
    description: 'Updates the properties of an existing category by ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category to update.',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Delete a category by ID',
    description: 'Removes a category from the database using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category to delete.',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

