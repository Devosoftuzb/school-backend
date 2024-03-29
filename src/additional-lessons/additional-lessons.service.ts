import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateLessonDto } from './dto/create-lessons.dto';
import { UpdateLessonDto } from './dto/update-lessons.dto';
import { Lesson } from './models/lesson.model';

@Injectable()
export class AdditionalLessonsService {
  constructor(@InjectModel(Lesson) private lessonRepo: typeof Lesson) {}

  async createLesson(createLessonDto: CreateLessonDto, res: Response) {
    const lessons = await this.lessonRepo.create(createLessonDto);
    return lessons;
  }

  async getAllLesson() {
    const lessons = await this.lessonRepo.findAll({ include: { all: true } });
    return lessons;
  }

  async getOneLesson(id: number): Promise<Lesson> {
    const lessons = await this.lessonRepo.findByPk(id);
    return lessons;
  }

  async delOneLesson(id: number) {
    return this.lessonRepo.destroy({ where: { id } });
  }

  async updateLesson(id: number, updateLessonDto: UpdateLessonDto) {
    const lessons = await this.lessonRepo.update(updateLessonDto, {
      where: { id },
    });
  }
}
