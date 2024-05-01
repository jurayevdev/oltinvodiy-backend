import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Category } from './models/category.model';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';



@Module({
  imports: [SequelizeModule.forFeature([Category]), JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}