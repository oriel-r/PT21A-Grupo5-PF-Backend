import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { Repository } from "typeorm";

@Injectable()
export class LessonsRepository {
    constructor(
        @InjectRepository(Lesson) private readonly lessonsRepository: Repository<Lesson>
    ) {}

    async getAll(limit: number, page: number): Promise<Lesson[]> {
        return await this.lessonsRepository.find({
            skip: (page - 1) * limit,
            take: limit
        })
    }

    async getById(id:string): Promise<Lesson> {
        return await this.lessonsRepository.findOneBy({id})
    }
}