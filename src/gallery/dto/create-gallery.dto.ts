import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGalleryDto {
    @ApiProperty({example: "Rasim", description: "Gallery rasmi"})
    @IsNotEmpty()
    image: any;
}
