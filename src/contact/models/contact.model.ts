import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ContactAttr {
    phone: string;
    info: string;
}

@Table({tableName: "contact"})
export class Contact extends Model<Contact, ContactAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @Column({
        type: DataType.TEXT,
    })
    info: string;
}

