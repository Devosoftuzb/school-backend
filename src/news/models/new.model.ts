import { Column, DataType, Model, Table } from "sequelize-typescript";

interface NewAttr {
    title: string;
    body: string;
}

@Table({tableName: "news"})
export class New extends Model<New, NewAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.STRING,
    })
    body: string;
}