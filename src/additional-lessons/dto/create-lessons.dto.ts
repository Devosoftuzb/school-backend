import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({example: "Title", description: "To'garaklar title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Hafta va kunlar", description: "To'garaklar hafta va kunlari"})
    @IsString()
    @IsNotEmpty()
    week_days: string;

}
