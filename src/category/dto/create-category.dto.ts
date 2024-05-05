import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "Name", description: "Categorya title uzb"})
    @IsString()
    @IsNotEmpty()
    name_uzb: string;

    @ApiProperty({example: "Name", description: "Categorya title rus"})
    @IsString()
    @IsNotEmpty()
    name_rus: string;

    @ApiProperty({example: "Name", description: "Categorya title eng"})
    @IsString()
    @IsNotEmpty()
    name_eng: string;
}
