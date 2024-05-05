import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { PdfMenu } from './models/pdf-menu.model';
import { CreatePdfMenuDto } from './dto/create-pdf-menu.dto';

@Injectable()
export class PdfMenuService {
  constructor(
    @InjectModel(PdfMenu) private pdfRepo: typeof PdfMenu,
    private readonly fileService: FilesService,
  ) {}

  async createPdfMenu(createPdfMenuDto: CreatePdfMenuDto, pdf: any) {
    if (pdf) {
      let pdf_name: string;
      try {
        pdf_name = await this.fileService.createFile(pdf);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const PdfMenu = await this.pdfRepo.create({
        pdf: pdf_name,
        ...createPdfMenuDto,
      });
      return {
        message: "Pdf qo'shildi",
        PdfMenu: PdfMenu,
      };
    }
    const PdfMenu = await this.pdfRepo.create(createPdfMenuDto);
    return {
      message: "Pdf qo'shildi",
      PdfMenu: PdfMenu,
    };
  }

  async getAllPdfMenu() {
    const PdfMenus = await this.pdfRepo.findAll({ include: { all: true } });
    return PdfMenus;
  }

  async getOnePdfMenu(id: number): Promise<PdfMenu> {
    const PdfMenu = await this.pdfRepo.findByPk(id);
    return PdfMenu;
  }

  async delOnePdfMenu(id: number) {
    let PdfMenu = await this.pdfRepo.findOne({ where: { id } });
    await this.pdfRepo.destroy({ where: { id } });

    if (PdfMenu.pdf !== 'null') {
      try {
        await this.fileService.deleteFile(PdfMenu.pdf);
      } catch (error) {
        console.log(error);
      }
    }
    return {
      message: "Pdf o'chirildi",
    };
  }
}
