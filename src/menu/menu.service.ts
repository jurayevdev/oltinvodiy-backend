import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Menu } from './models/menu.model';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';


@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu) private menuRepo: typeof Menu,
    private readonly fileService: FilesService,
  ) {}

  async createMenu(createMenuDto: CreateMenuDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const menu = await this.menuRepo.create({
        image: image_name,
        ...createMenuDto,
      });
      return {
        message: "Menu qo'shildi",
        menu: menu,
      };
    }
    const menu = await this.menuRepo.create(createMenuDto);
    return {
      message: "Menu qo'shildi",
      menu: menu,
    };
  }

  async getAllMenu() {
    const menus = await this.menuRepo.findAll({ include: { all: true } });
    return menus;
  }

  async getOneMenu(id: number): Promise<Menu> {
    const menu = await this.menuRepo.findByPk(id);
    return menu;
  }

  async delOneMenu(id: number) {
    let menu = await this.menuRepo.findOne({ where: { id } });
    await this.menuRepo.destroy({ where: { id } });

    if (menu.image !== 'null') {
      await this.fileService.deleteFile(menu.image);
    }
    return {
      message: "Menu o'chirildi",
    };
  }

  async updateMenu(
    id: number,
    updateMenuDto: UpdateMenuDto,
    image: any,
  ) {
    if (image) {
      let image_name: string;
      let oldMenuImage = await this.menuRepo.findOne({ where: { id } });
      try {
        if (oldMenuImage.image !== 'null') {
          await this.fileService.deleteFile(oldMenuImage.image);
        }
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const menu = await this.menuRepo.update(
        {
          image: image_name,
          ...updateMenuDto,
        },
        { where: { id } },
      );
      return {
        message: "Menu o'zgartirildi",
        menu: menu,
      };
    }
    const menu = await this.menuRepo.update(updateMenuDto, {
      where: { id },
    });
    return {
      message: "Menu o'zgartirildi",
      menu: menu,
    };
  }
}

