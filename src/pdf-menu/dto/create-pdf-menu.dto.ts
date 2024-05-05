import { ApiProperty } from "@nestjs/swagger";

export class CreatePdfMenuDto {
    @ApiProperty({example: "Pdf", description: "Menu pdf"})
    pdf: any;
}
