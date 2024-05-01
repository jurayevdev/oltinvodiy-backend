import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Contact } from './models/contact.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact) private contactRepo: typeof Contact,
    @InjectBot() private bot: Telegraf<Context>,
  ) {}

  async createContact(createContactDto: CreateContactDto, res: Response) {
    const contacts = await this.contactRepo.create(createContactDto);
    let contacts_info = `\n\n<b>Yangi xabar!</b>\n\n`;
    contacts_info += `<b>Phone:</b> ${createContactDto.phone}\n`;
    contacts_info += `<b>Text:</b> ${createContactDto.info}\n`;
    await this.bot.telegram.sendMessage(process.env.ADMINS, contacts_info, {
      parse_mode: 'HTML',
    });
    return {
      message: "Kontakt qo'shildi",
      contact: contacts,
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
      message: "Kontakt o'chirildi",
    };
  }
}
