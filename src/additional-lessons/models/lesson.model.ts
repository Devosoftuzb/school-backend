import { Column, DataType, Model, Table } from "sequelize-typescript";

interface LessonAttr {
    title: string;
    image: string;
    week_days: string;
}

@Table({tableName: "lesson"})
export class Lesson extends Model<Lesson, LessonAttr> {
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

    @Column({
        type: DataType.STRING,
    })
    week_days: string;
}