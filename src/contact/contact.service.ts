import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Contact } from './models/contact.model';
import { CreateContactDto } from './dto/create-contact.dto';


@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact) private contactRepo: typeof Contact) {}

  async createContact(createContactDto: CreateContactDto, res: Response) {
    const contacts = await this.contactRepo.create(createContactDto);
    return {
      message: "Kontakt qo'shildi",
      contact: contacts
    };
  }

  async getAllContact() {
    const contacts = await this.contactRepo.findAll({ include: { all: true } });
    return contacts;
  }

  async getOneContact(id: number): Promise<Contact> {
    const contacts = await this.contactRepo.findByPk(id);
    return contacts;
  }

  async delOneContact(id: number) {
    this.contactRepo.destroy({ where: { id } });
    return {
      message: "Kontakt o'chirildi"
    };
  }
}
