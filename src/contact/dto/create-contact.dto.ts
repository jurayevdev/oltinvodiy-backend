import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @ApiProperty({example: "+998901234567", description: "Telefon raqam"})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "savol", description: "Savol matni"})
    @IsString()
    @IsNotEmpty()
    info: string;

}
