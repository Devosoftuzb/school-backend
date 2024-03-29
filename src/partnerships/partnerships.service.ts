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

  async createPartnership(
    createPartnershipDto: CreatePartnershipsDto,
    res: Response,
  ) {
    const { image } = createPartnershipDto;
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const partnership = await this.partnershipRepo.create({
        image: image_name,
        ...createPartnershipDto,
      });
      return {
        message: "Hamkor qo'shildi",
        partnership: partnership,
      };
    }
    const partnership = await this.partnershipRepo.create(createPartnershipDto);
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
    this.partnershipRepo.destroy({ where: { id } });

    return {
      message: "Hamkor o'chirildi",
    };
  }

  async updatePartnership(
    id: number,
    updatePartnershipDto: UpdatePartnershipsDto,
  ) {
    const partnership = await this.partnershipRepo.findOne({ where: { id } });
    const { image } = updatePartnershipDto;
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const partnership_updated = await this.partnershipRepo.update(
        { image: image_name, ...updatePartnershipDto },
        { where: { id: partnership.id }, returning: true },
      );
      return {
        message: 'Hamkor tahrirlandi',
        partnership: partnership_updated[1][0],
      };
    }
    const updated_partnership = await this.partnershipRepo.update(
      updatePartnershipDto,
      {
        where: { id: partnership.id },
        returning: true,
      },
    );
    return {
      message: 'Hamkor tahrirlandi',
      partnership: updated_partnership[1][0],
    };
  }
}
