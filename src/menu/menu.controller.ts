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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './models/menu.model';
import { UpdateMenuDto } from './dto/update-menu.dto';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: "Menu qo'shish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  // @ApiConsumes('multipart/form-data')
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createMenuDto: CreateMenuDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.menuService.createMenu(createMenuDto, image);
  }

  @ApiOperation({ summary: "Menuni ko'rish" })
  @Get('find-all')
  async getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @ApiOperation({ summary: "Menu ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneMenu(@Param('id') id: string): Promise<Menu> {
    return this.menuService.getOneMenu(+id);
  }

  @ApiOperation({ summary: "Menu ID si bo'yicha o'chirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneMenu(@Param('id') id: string) {
    return this.menuService.delOneMenu(+id);
  }

  @ApiOperation({ summary: "Menu ID si bo'yicha o'zgartirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  // @ApiConsumes('multipart/form-data')
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.menuService.updateMenu(+id, updateMenuDto, image);
  }
}
