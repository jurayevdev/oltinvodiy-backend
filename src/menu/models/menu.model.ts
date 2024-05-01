import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "src/category/models/category.model";

interface MenuAttr {
    title_uzb: string;
    title_rus: string;
    body_uzb: string;
    body_rus: string;
    image: string;
}

@Table({tableName: "menu"})
export class Menu extends Model<Menu, MenuAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    title_uzb: string;

    @Column({
        type: DataType.STRING,
    })
    title_rus: string;

    @Column({
        type: DataType.TEXT,
    })
    body_uzb: string;

    @Column({
        type: DataType.TEXT,
    })
    body_rus: string;

    @Column({
        type: DataType.STRING,
    })
    image: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER
    })
    category_id: number;
    @BelongsTo(() => Category)
    category: Category
}