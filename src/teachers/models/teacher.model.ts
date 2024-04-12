import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TeacherAttr {
    full_name: string;
    profession: string;
    info: string;
    image: string;
    number: string;
    status: boolean;
}

@Table({tableName: "teacher"})
export class Teacher extends Model<Teacher, TeacherAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
    })
    profession: string;

    @Column({
        type: DataType.STRING,
    })
    info: string;

    @Column({
        type: DataType.STRING,
    })
    image: string;

    @Column({
        type: DataType.STRING,
    })
    number: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    status: boolean;
}