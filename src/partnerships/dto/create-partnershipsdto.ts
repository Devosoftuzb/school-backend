import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePartnershipsDto {
    @ApiProperty({example: "Title", description: "Hamkor title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Rasim", description: "Hamkor rasmi"})
    image: any;
}
