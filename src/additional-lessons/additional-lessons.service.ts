import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateLessonDto } from './dto/create-lessons.dto';
import { UpdateLessonDto } from './dto/update-lessons.dto';
import { Lesson } from './models/lesson.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AdditionalLessonsService {
  constructor(
    @InjectModel(Lesson) private lessonRepo: typeof Lesson,
    private readonly fileService: FilesService,
  ) {}

  async createLesson(createLessonDto: CreateLessonDto, res: Response) {
    const { image } = createLessonDto;
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const lesson = await this.lessonRepo.create({
        image: image_name,
        ...createLessonDto,
      });
      return {
        message: "To'garak qo'shildi",
        lesson: lesson,
      };
    }

    const lesson = await this.lessonRepo.create(createLessonDto);
    return {
      message: "To'garak qo'shildi",
      lesson: lesson,
    };
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
    this.lessonRepo.destroy({ where: { id } });

    return {
      message: "To'garak o'chirildi",
    };
  }

  async updateLesson(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    const { image } = updateLessonDto;
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const lesson_updated = await this.lessonRepo.update(
        { image: image_name, ...updateLessonDto },
        { where: { id: lesson.id }, returning: true },
      );
      return {
        message: "To'garak tahrirlandi",
        lesson: lesson_updated[1][0],
      };
    }
    const updated_lesson = await this.lessonRepo.update(updateLessonDto, {
      where: { id: lesson.id },
      returning: true,
    });
    return {
      message: "To'garak tahrirlandi",
      lesson: updated_lesson[1][0],
    };
  }
}
