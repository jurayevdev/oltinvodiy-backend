import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) {}

  async createCategory(createCategoryDto: CreateCategoryDto, res: Response) {
    const category = await this.categoryRepo.create(createCategoryDto);
    return {
      message: "Categorya qo'shildi",
      category: category,
    };
  }

  async getAllCategory() {
    const category = await this.categoryRepo.findAll({
      include: { all: true },
    });
    return category;
  }

  async getOneCategory(id: number): Promise<Category> {
    const category = await this.categoryRepo.findByPk(id);
    return category;
  }

  async delOneCategory(id: number) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new BadRequestException('Category topilmadi');
    }
    category.destroy();
    return {
      message: "Categorya o'chirildi",
    };
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.update(updateCategoryDto, {
      where: { id },
    });
    return {
      message: 'Categorya tahrirlandi',
      category: category,
    };
  }
}
