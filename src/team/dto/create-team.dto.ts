import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    @ApiProperty({example: "Name", description: "Jamoani nomi uzb"})
    @IsString()
    @IsNotEmpty()
    name_uzb: string;

    @ApiProperty({example: "Name", description: "Jamoani nomi rus"})
    @IsString()
    @IsNotEmpty()
    name_rus: string;

    @ApiProperty({example: "Name", description: "Jamoani nomi eng"})
    @IsString()
    @IsNotEmpty()
    name_eng: string;

    @ApiProperty({example: "Jamoa", description: "Jamoa lavozimi uzb"})
    @IsString()
    @IsNotEmpty()
    profession_uzb: string;

    @ApiProperty({example: "Jamoa", description: "Jamoa lavozimi rus"})
    @IsString()
    @IsNotEmpty()
    profession_rus: string;

    @ApiProperty({example: "Jamoa", description: "Jamoa lavozimi eng"})
    @IsString()
    @IsNotEmpty()
    profession_eng: string;

    @ApiProperty({example: "info", description: "Jamoa ma'lumoti uzb"})
    @IsNotEmpty()
    info_uzb: string;

    @ApiProperty({example: "info", description: "Jamoa ma'lumoti rus"})
    @IsNotEmpty()
    info_rus: string;

    @ApiProperty({example: "info", description: "Jamoa ma'lumoti eng"})
    @IsNotEmpty()
    info_eng: string;

    @ApiProperty({example: "Rasim", description: "Jamoa rasmi"})
    image: any;
}
