import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePartnershipsDto {
    @ApiProperty({example: "Title", description: "Hamkorlar title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "Body", description: "Hamkorlar rasmi"})
    @IsString()
    image: string;
}
