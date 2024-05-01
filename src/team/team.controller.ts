import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Res,
    UseGuards,
    Put,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { Roles } from '../decorators/roles-auth-decorator';
  import { RolesGuard } from '../guards/roles.guard';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './models/team.model';
import { UpdateTeamDto } from './dto/update-team.dto';
  
  @ApiTags("Jamoa")
  @Controller('team')
  export class TeamController {
    constructor(private readonly teamService: TeamService) {}
  
    @ApiOperation({ summary: "Jamoa qo'shish" })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    // @ApiConsumes('multipart/form-data')
    @Post('/create')
    @UseInterceptors(FileInterceptor('image'))
    async create(
      @Body() createTeamDto: CreateTeamDto,
      @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
    ) {
      return this.teamService.createTeam(createTeamDto, image);
    }
  
    @ApiOperation({ summary: "Jamoani ko'rish" })
    @Get('find-all')
    async getAllTeam() {
      return this.teamService.getAllTeam();
    }
  
    @ApiOperation({ summary: "Jamoa ID si bo'yicha ko'rish" })
    @Get('find/:id')
    async getOneTeam(@Param('id') id: string): Promise<Team> {
      return this.teamService.getOneTeam(+id);
    }
  
    @ApiOperation({ summary: "Jamoa ID si bo'yicha o'chirish" })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('delete/:id')
    async delOneTeam(@Param('id') id: string) {
      return this.teamService.delOneTeam(+id);
    }
  
    @ApiOperation({ summary: "Jamoa ID si bo'yicha o'zgartirish" })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    // @ApiConsumes('multipart/form-data')
    @Put('update/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateTeam(
      @Param('id') id: string,
      @Body() updateTeamDto: UpdateTeamDto,
      @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
    ) {
      return this.teamService.updateTeam(+id, updateTeamDto, image);
    }
  }
  