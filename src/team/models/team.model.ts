import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TeamAttr {
    name_uzb: string;
    name_rus: string;
    name_eng: string;
    profession_uzb: string;
    profession_rus: string;
    profession_eng: string;
    info_uzb: string;
    info_rus: string;
    info_eng: string;
    image: string;
}

@Table({tableName: "team"})
export class Team extends Model<Team, TeamAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
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

    @Column({
        type: DataType.STRING,
    })
    profession_uzb: string;

    @Column({
        type: DataType.STRING,
    })
    profession_rus: string;

    @Column({
        type: DataType.STRING,
    })
    profession_eng: string;

    @Column({
        type: DataType.TEXT,
    })
    info_uzb: string;

    @Column({
        type: DataType.TEXT,
    })
    info_rus: string;

    @Column({
        type: DataType.TEXT,
    })
    info_eng: string;

    @Column({
        type: DataType.STRING,
    })
    image: string;
}