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
import { PdfMenuService } from './pdf-menu.service';
import { CreatePdfMenuDto } from './dto/create-pdf-menu.dto';
import { PdfMenu } from './models/pdf-menu.model';
  
  @ApiTags('Pdf Menu')
  @Controller('pdf-menu')
  export class PdfMenuController {
    constructor(private readonly pdfMenuService: PdfMenuService) {}
  
    @ApiOperation({ summary: "Pdf qo'shish" })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/create')
    @UseInterceptors(FileInterceptor('pdf'))
    async create(
      @Body() createPdfMenuDto: CreatePdfMenuDto,
      @UploadedFile(new ImageValidationPipe()) pdf: Express.Multer.File,
    ) {
      return this.pdfMenuService.createPdfMenu(createPdfMenuDto, pdf);
    }
  
    @ApiOperation({ summary: "Pdfni ko'rish" })
    @Get('find-all')
    async getAllPdfMenu() {
      return this.pdfMenuService.getAllPdfMenu();
    }
  
    @ApiOperation({ summary: "Pdf ID si bo'yicha ko'rish" })
    @Get('find/:id')
    async getOnePdfMenu(@Param('id') id: string): Promise<PdfMenu> {
      return this.pdfMenuService.getOnePdfMenu(+id);
    }
  
    @ApiOperation({ summary: "Pdf ID si bo'yicha o'chirish" })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('delete/:id')
    async delOnePdfMenu(@Param('id') id: string) {
      return this.pdfMenuService.delOnePdfMenu(+id);
    }
  }
  