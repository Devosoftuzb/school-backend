import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({example: "Title", description: "To'garak title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Rasim", description: "To'garak rasmi"})
    image: any;

    @ApiProperty({example: "Hafta va kunlar", description: "To'garak hafta va kunlari"})
    @IsString()
    @IsNotEmpty()
    week_days: string;

}
