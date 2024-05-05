import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PdfMenuAttr {
    pdf: string;
}

@Table({tableName: "pdf-menu"})
export class PdfMenu extends Model<PdfMenu, PdfMenuAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    pdf: string;
}