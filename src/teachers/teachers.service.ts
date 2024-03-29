import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './models/teacher.model';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teacher) private teacherRepo: typeof Teacher) {}

  async createTeacher(createTeacherDto: CreateTeacherDto, res: Response) {
    const teacher = await this.teacherRepo.create(createTeacherDto);
    return {
      message: "O'qituvchi qo'shildi",
      teacher: teacher
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
    this.teacherRepo.destroy({ where: { id } });
    return {
      message: "O'qituvchi o'chirildi"
    }
  }

  async updateTeacher(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherRepo.update(updateTeacherDto, {
      where: { id },
    });

    return {
      message: "O'qtuvchi o'zgartirildi",
      teacher: teacher
    }
  }
}
