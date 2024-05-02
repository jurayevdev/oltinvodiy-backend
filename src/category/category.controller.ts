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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './models/category.model';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categorya')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Categorya qo'shish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.categoryService.createCategory(createCategoryDto, res);
  }

  @ApiOperation({ summary: "Categoryani ko'rish" })
  @Get('find-all')
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @ApiOperation({ summary: "Categorya ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getOneCategory(+id);
  }

  @ApiOperation({ summary: "Categorya ID si bo'yicha o'chirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneCategory(@Param('id') id: string) {
    return this.categoryService.delOneCategory(+id);
  }

  @ApiOperation({ summary: "Categoryani ID si bo'yicha o'zgartirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put("update/:id")
    async updateCategory(@Param('id') id: string, @Body() updateCategory: UpdateCategoryDto){
      return this.categoryService.updateCategory(+id, updateCategory)
    }
}
