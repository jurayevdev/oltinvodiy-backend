import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Gallery } from './models/gallery.model';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery) private galleryRepo: typeof Gallery,
    private readonly fileService: FilesService,
  ) {}

  async createGallery(createGalleryDto: CreateGalleryDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const gallery = await this.galleryRepo.create({
        image: image_name,
        ...createGalleryDto,
      });
      return {
        message: "Rasim qo'shildi",
        gallery: gallery,
      };
    }
    const gallery = await this.galleryRepo.create(createGalleryDto);
    return {
      message: "Rasim qo'shildi",
      gallery: gallery,
    };
  }

  async getAllGallery() {
    const gallerys = await this.galleryRepo.findAll({ include: { all: true } });
    return gallerys;
  }

  async getOneGallery(id: number): Promise<Gallery> {
    const gallery = await this.galleryRepo.findByPk(id);
    return gallery;
  }

  async delOneGallery(id: number) {
    let gallery = await this.galleryRepo.findOne({ where: { id } });
    await this.galleryRepo.destroy({ where: { id } });

    if (gallery.image !== 'null') {
      try {
        await this.fileService.deleteFile(gallery.image);
      } catch (error) {
        console.log(error);
      }
    }
    return {
      message: "Rasim o'chirildi",
    };
  }
}
