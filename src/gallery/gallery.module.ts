import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';
import { Gallery } from './models/gallery.model';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  imports: [SequelizeModule.forFeature([Gallery]), JwtModule, FilesModule],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}