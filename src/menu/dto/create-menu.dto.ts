import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateMenuDto {
    @ApiProperty({example: "Title", description: "Menu title uzb"})
    @IsString()
    @IsNotEmpty()
    title_uzb: string;

    @ApiProperty({example: "Title", description: "Menu title rus"})
    @IsString()
    @IsNotEmpty()
    title_rus: string;

    @ApiProperty({example: "Body", description: "Menu ma'lumoti uzb"})
    @IsNotEmpty()
    body_uzb: string;

    @ApiProperty({example: "Body", description: "Menu ma'lumoti rus"})
    @IsNotEmpty()
    body_rus: string;

    @ApiProperty({example: "Rasim", description: "Menu rasmi"})
    image: any;

    @ApiProperty({example: "1", description: "Categorya ID si"})
    @IsInt()
    @IsNotEmpty()
    category_id: number;
}
