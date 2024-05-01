import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { SocialMedia } from './models/social-media.model';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';


@Injectable()
export class SocialMediaService {
  constructor(@InjectModel(SocialMedia) private socialMediaRepo: typeof SocialMedia) {}

  async createSocialMedia(createSocialMediaDto: CreateSocialMediaDto, res: Response) {
    const social_media = await this.socialMediaRepo.create(createSocialMediaDto);
    return {
      message: "Social Media qo'shildi",
      social_media: social_media
    };
  }

  async getAllSocialMedia() {
    const social_media = await this.socialMediaRepo.findAll({ include: { all: true } });
    return social_media;
  }

  async getOneSocialMedia(id: number): Promise<SocialMedia> {
    const social_media = await this.socialMediaRepo.findByPk(id);
    return social_media;
  }

  async delOneSocialMedia(id: number) {
    this.socialMediaRepo.destroy({ where: { id } });
    return {
      message: "Social Media o'chirildi"
    };
  }

  async updateSocialMedia(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    const social_media = await this.socialMediaRepo.update(updateSocialMediaDto, {
      where: { id },
    })
    return {
      message: "Social Media tahrirlandi",
      social_media: social_media
    };
  }
}