import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './models/teacher.model';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher) private teacherRepo: typeof Teacher,
    private readonly fileService: FilesService,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const teacher = await this.teacherRepo.create({
        image: image_name,
        ...createTeacherDto,
      });
      return {
        message: "O'qituvchi qo'shildi",
        teacher: teacher,
      };
    }
    const teacher = await this.teacherRepo.create(createTeacherDto);
    return {
      message: "O'qituvchi qo'shildi",
      teacher: teacher,
    };
  }

  async getAllTeacher() {
    const teachers = await this.teacherRepo.findAll({ include: { all: true } });
    return teachers;
  }

  async getOneTeacher(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepo.findByPk(id);
    return teacher;
  }

  async delOneTeacher(id: number) {
    let teacher = await this.teacherRepo.findOne({ where: { id } });
    await this.teacherRepo.destroy({ where: { id } });
    await this.fileService.deleteFile(teacher.image)
    return {
      message: "O'qituvchi o'chirildi",
    };
  }

  async updateTeacher(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
    image: any,
  ) {
    if (image) {
      let image_name: string;
      let oldTeacherImage = await this.teacherRepo.findOne({ where: { id } });
      try {
        await this.fileService.deleteFile(oldTeacherImage.image)
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const teacher = await this.teacherRepo.update(
        {
          image: image_name,
          ...updateTeacherDto,
        },
        { where: { id } },
      );
      return {
        message: "O'qituvchi o'zgartirildi",
        teacher: teacher,
      };
    }
    const teacher = await this.teacherRepo.update(updateTeacherDto, {
      where: { id },
    });
    return {
      message: "O'qituvchi o'zgartirildi",
      teacher: teacher,
    };
  }
}
