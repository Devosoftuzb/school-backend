import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Partnership } from './models/partnerships.model';
import { CreatePartnershipsDto } from './dto/create-partnershipsdto';
import { UpdatePartnershipsDto } from './dto/update-partnerships.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PartnershipsService {
  constructor(
    @InjectModel(Partnership) private partnershipRepo: typeof Partnership,
    private readonly fileService: FilesService,
  ) {}

  async createPartnership(createPartnershipsDto: CreatePartnershipsDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const partnership = await this.partnershipRepo.create({
        image: image_name,
        ...createPartnershipsDto,
      });
      return {
        message: "Hamkor qo'shildi",
        partnership: partnership,
      };
    }
    const partnership = await this.partnershipRepo.create(createPartnershipsDto);
    return {
      message: "Hamkor qo'shildi",
      partnership: partnership,
    };
  }

  async getAllPartnership() {
    const partnerships = await this.partnershipRepo.findAll({
      include: { all: true },
    });
    return partnerships;
  }

  async getOnePartnership(id: number): Promise<Partnership> {
    const partnerships = await this.partnershipRepo.findByPk(id);
    return partnerships;
  }

  async delOnePartnership(id: number) {
    let partnership = await this.partnershipRepo.findOne({ where: { id } });
    await this.partnershipRepo.destroy({ where: { id } });
    await this.fileService.deleteFile(partnership.image)
    return {
      message: "Hamkor o'chirildi",
    };
  }

  async updatePartnership(
    id: number,
    updatePartnershipsDto: UpdatePartnershipsDto,
    image: any,
  ) {
    if (image) {
      let image_name: string;
      let oldPartnershipImage = await this.partnershipRepo.findOne({ where: { id } });
      try {
        await this.fileService.deleteFile(oldPartnershipImage.image)
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const partnership = await this.partnershipRepo.update(
        {
          image: image_name,
          ...updatePartnershipsDto,
        },
        { where: { id } },
      );
      return {
        message: "Hamkor o'zgartirildi",
        partnership: partnership,
      };
    }
    const partnership = await this.partnershipRepo.update(updatePartnershipsDto, {
      where: { id },
    });
    return {
      message: "Hamkor o'zgartirildi",
      partnership: partnership,
    };
  }
}
