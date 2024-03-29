import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { UpdateNewDto } from './dto/update-new.dto';
import { New } from './models/new.model';
import { CreateNewDto } from './dto/create-new.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(New) private newRepo: typeof New) {}

  async createNew(createNewDto: CreateNewDto, res: Response) {
    const news = await this.newRepo.create(createNewDto);
    return news;
  }

  async getAllNew() {
    const news = await this.newRepo.findAll({ include: { all: true } });
    return news;
  }

  async getOneNew(id: number): Promise<New> {
    const news = await this.newRepo.findByPk(id);
    return news;
  }

  async delOneNew(id: number) {
    return this.newRepo.destroy({ where: { id } });
  }

  async updateNew(id: number, updateNewDto: UpdateNewDto) {
    const news = await this.newRepo.update(updateNewDto, {
      where: { id },
    });
  }
}
