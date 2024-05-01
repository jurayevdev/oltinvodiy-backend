import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GalleryAttr {
    image: string;
}

@Table({tableName: "gallery"})
export class Gallery extends Model<Gallery, GalleryAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    image: string;
}