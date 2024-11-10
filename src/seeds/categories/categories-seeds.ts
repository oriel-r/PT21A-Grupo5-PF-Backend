import { Injectable } from '@nestjs/common';
<<<<<<< HEAD

@Injectable()
export class CategoriesSeed {}
=======
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { In, Repository } from 'typeorm';
import { categoriesMock } from './categories-mock';

@Injectable()
export class CategoriesSeed {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async seed() {
    const existingCategories = await this.categoriesRepository.find({
      where: { name: In(categoriesMock) },
    });

    for (const categoryName of categoriesMock) {
      if (
        !existingCategories.some((category) => category.name === categoryName)
      ) {
        const category = new Category();
        category.name = categoryName;
        await this.categoriesRepository.save(category);
      }
    }
  }
}
>>>>>>> dev
