import { ApiProperty } from "@nestjs/swagger";

export class CreateGalleryDto {
    @ApiProperty({example: "Rasim", description: "Gallery rasmi"})
    image: any;
}
