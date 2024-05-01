import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Gallery } from './models/gallery.model';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @ApiOperation({ summary: "Rasim qo'shish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.galleryService.createGallery(createGalleryDto, image);
  }

  @ApiOperation({ summary: "Rasimni ko'rish" })
  @Get('find-all')
  async getAllGallery() {
    return this.galleryService.getAllGallery();
  }

  @ApiOperation({ summary: "Rasim ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneGallery(@Param('id') id: string): Promise<Gallery> {
    return this.galleryService.getOneGallery(+id);
  }

  @ApiOperation({ summary: "Rasim ID si bo'yicha o'chirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneGallery(@Param('id') id: string) {
    return this.galleryService.delOneGallery(+id);
  }
}
