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

    @ApiProperty({example: "info", description: "O'qituvchi ma'lumoti"})
    @IsString()
    @IsNotEmpty()
    info: string;

    @ApiProperty({example: "+9989012345678", description: "O'qituvchining telefon raqami"})
    @IsString()
    @IsNotEmpty()
    number: string;

}