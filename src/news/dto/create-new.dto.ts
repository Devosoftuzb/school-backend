import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewDto {
    @ApiProperty({example: "Title", description: "Yangilik title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Body", description: "Yangilik body"})
    @IsString()
    @IsNotEmpty()
    body: string;

}
