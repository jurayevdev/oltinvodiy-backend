import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSocialMediaDto {
    @ApiProperty({example: "Name", description: "Social Media nomi"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "Name", description: "Social Media linki"})
    @IsString()
    @IsNotEmpty()
    link: string;
}
