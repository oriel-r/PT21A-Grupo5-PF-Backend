import { Category } from 'src/categories/entities/category.entity';
import { Level } from 'src/enums/level.enum';
import { Specialization } from 'src/enums/specializations.enum';
import { Language } from 'src/language/entities/language.entity';
import { DeepPartial } from 'typeorm';

export interface FilterCourses {
  title?: string;
  specialization?: Specialization;
  level?: Level;
  language?: DeepPartial<Language>;
  category?: DeepPartial<Category>;
}
