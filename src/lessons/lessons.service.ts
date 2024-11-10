import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';

@Injectable()
export class LessonsService {
    constructor(
        private readonly lessonsRepositoy: LessonsRepository
    ){}
}
