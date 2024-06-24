import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Menu } from 'src/menu/models/menu.model';

interface CategoryAttr {
  name_uzb: string;
  name_rus: string;
  name_eng: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name_uzb: string;

  @Column({
    type: DataType.STRING,
  })
  name_rus: string;

  @Column({
    type: DataType.STRING,
  })
  name_eng: string;

  @HasMany(() => Menu, { onDelete: 'CASCADE', hooks: true })
  menu: Menu;
}
