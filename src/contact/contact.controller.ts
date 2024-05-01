import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Contact } from './models/contact.model';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';


@ApiTags("Bog'lanish")
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: "Kontakt qo'shish" })
  @Post('create')
  async create(@Body() createContactDto: CreateContactDto, @Res({ passthrough: true }) res: Response) {
    return this.contactService.createContact(createContactDto, res);
  }

  @ApiOperation({ summary: "Kontaktni ko'rish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllContact() {
    return this.contactService.getAllContact();
  }

  @ApiOperation({ summary: "Kontakt ID si bo'yicha ko'rish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneContact(@Param("id") id: string): Promise<Contact> {
    return this.contactService.getOneContact(+id);
  }

  @ApiOperation({ summary: "Kontakt ID si bo'yicha o'chirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneContact(@Param("id") id: string) {
    return this.contactService.delOneContact(+id);
  }
}