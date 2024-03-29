import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Partnership } from './models/partnerships.model';
import { CreatePartnershipsDto } from './dto/create-partnershipsdto';
import { UpdatePartnershipsDto } from './dto/update-partnerships.dto';

@Injectable()
export class PartnershipsService {
  constructor(@InjectModel(Partnership) private partnershipRepo: typeof Partnership) {}

  async createPartnership(createPartnershipDto: CreatePartnershipsDto, res: Response) {
    const partnerships = await this.partnershipRepo.create(createPartnershipDto);
    return partnerships;
  }

  async getAllPartnership() {
    const partnerships = await this.partnershipRepo.findAll({ include: { all: true } });
    return partnerships;
  }

  async getOnePartnership(id: number): Promise<Partnership> {
    const partnerships = await this.partnershipRepo.findByPk(id);
    return partnerships;
  }

  async delOnePartnership(id: number) {
    return this.partnershipRepo.destroy({ where: { id } });
  }

  async updatePartnership(id: number, updatePartnershipDto: UpdatePartnershipsDto) {
    const partnerships = await this.partnershipRepo.update(updatePartnershipDto, {
      where: { id },
    });
  }
}
