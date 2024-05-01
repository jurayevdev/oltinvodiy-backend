import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { SocialMedia } from './models/social-media.model';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';


@ApiTags("Social Media")
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @ApiOperation({ summary: "Social Media qo'shish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createSocialMediaDto: CreateSocialMediaDto, @Res({ passthrough: true }) res: Response) {
    return this.socialMediaService.createSocialMedia(createSocialMediaDto, res);
  }

  @ApiOperation({ summary: "Social Mediani ko'rish" })
  @Get('find-all')
  async getAllSocialMedia() {
    return this.socialMediaService.getAllSocialMedia();
  }

  @ApiOperation({ summary: "Social Media ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneSocialMedia(@Param("id") id: string): Promise<SocialMedia> {
    return this.socialMediaService.getOneSocialMedia(+id);
  }

  @ApiOperation({ summary: "Social Media ID si bo'yicha o'chirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneSocialMedia(@Param("id") id: string) {
    return this.socialMediaService.delOneSocialMedia(+id);
  }

  @ApiOperation( {summary: "Social Mediani ID si bo'yicha o'zgartirish"})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
    async updateSocialMedia(@Param('id') id: string, @Body() updateSocialMedia: UpdateSocialMediaDto){
      return this.socialMediaService.updateSocialMedia(+id, updateSocialMedia)
    }
}