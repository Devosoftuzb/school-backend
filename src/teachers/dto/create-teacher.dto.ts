import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({example: "John Doe", description: "O'qituvchini to'liq ismi"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "English o'qituvchi", description: "O'qituvchi lavozimi"})
    @IsString()
    @IsNotEmpty()
    profession: string;

    @ApiProperty({example: "Rasim", description: "O'qituvchi rasmi"})
    image: any;

    @ApiProperty({example: "info", description: "O'qituvchi ma'lumoti"})
    @IsNotEmpty()
    info: string;

    @ApiProperty({example: "+9989012345678", description: "O'qituvchining telefon raqami"})
    @IsString()
    @IsNotEmpty()
    number: string;

    @ApiProperty({example: "true or false", description: "O'qituvchi yoki Direktirni aniqlash"})
    @IsNotEmpty()
    status: boolean;

}
