import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PartnershipAttr {
    title: string;
    image: string;
}

@Table({tableName: "partnership"})
export class Partnership extends Model<Partnership, PartnershipAttr> {
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
    image: string;
}