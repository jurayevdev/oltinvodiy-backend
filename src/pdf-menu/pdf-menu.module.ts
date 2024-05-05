import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';
import { PdfMenu } from './models/pdf-menu.model';
import { PdfMenuController } from './pdf-menu.controller';
import { PdfMenuService } from './pdf-menu.service';

@Module({
  imports: [SequelizeModule.forFeature([PdfMenu]), JwtModule, FilesModule],
  controllers: [PdfMenuController],
  providers: [PdfMenuService]
})
export class PdfMenuModule {}