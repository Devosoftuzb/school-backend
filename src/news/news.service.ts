import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { UpdateNewDto } from './dto/update-new.dto';
import { New } from './models/new.model';
import { CreateNewDto } from './dto/create-new.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(New) private newRepo: typeof New,
    private readonly fileService: FilesService,
  ) {}

  async createNew(createNewDto: CreateNewDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const news = await this.newRepo.create({
        image: image_name,
        ...createNewDto,
      });
      return {
        message: "Yangilik qo'shildi",
        news: news,
      };
    }
    const news = await this.newRepo.create(createNewDto);
    return {
      message: "Yangilik qo'shildi",
      news: news,
    };
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
    let news = await this.newRepo.findOne({ where: { id } });
    await this.newRepo.destroy({ where: { id } });
    if (news.image !== 'null'){
      await this.fileService.deleteFile(news.image)
    }
    return {
      message: "Yangilik o'chirildi",
    };
  }

  async updateNew(
    id: number,
    updateNewDto: UpdateNewDto,
    image: any,
  ) {
    if (image) {
      let image_name: string;
      let oldNewImage = await this.newRepo.findOne({ where: { id } });
      try {
        if (oldNewImage.image !== 'null'){
          await this.fileService.deleteFile(oldNewImage.image)
        }
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const news = await this.newRepo.update(
        {
          image: image_name,
          ...updateNewDto,
        },
        { where: { id } },
      );
      return {
        message: "Yangilik o'zgartirildi",
        news: news,
      };
    }
    const news = await this.newRepo.update(updateNewDto, {
      where: { id },
    });
    return {
      message: "Yangilik o'zgartirildi",
      news: news,
    };
  }
}
