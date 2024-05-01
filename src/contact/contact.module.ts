import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './models/contact.model';


@Module({
  imports: [SequelizeModule.forFeature([Contact]), JwtModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}