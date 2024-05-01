import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Team } from './models/team.model';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team) private teamRepo: typeof Team,
    private readonly fileService: FilesService,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const team = await this.teamRepo.create({
        image: image_name,
        ...createTeamDto,
      });
      return {
        message: "Jamoa qo'shildi",
        team: team,
      };
    }
    const team = await this.teamRepo.create(createTeamDto);
    return {
      message: "Jamoa qo'shildi",
      team: team,
    };
  }

  async getAllTeam() {
    const teams = await this.teamRepo.findAll({ include: { all: true } });
    return teams;
  }

  async getOneTeam(id: number): Promise<Team> {
    const team = await this.teamRepo.findByPk(id);
    return team;
  }

  async delOneTeam(id: number) {
    let team = await this.teamRepo.findOne({ where: { id } });
    await this.teamRepo.destroy({ where: { id } });

    if (team.image !== 'null') {
      await this.fileService.deleteFile(team.image);
    }
    return {
      message: "Jamoa o'chirildi",
    };
  }

  async updateTeam(
    id: number,
    updateTeamDto: UpdateTeamDto,
    image: any,
  ) {
    if (image) {
      let image_name: string;
      let oldTeamImage = await this.teamRepo.findOne({ where: { id } });
      try {
        if (oldTeamImage.image !== 'null') {
          await this.fileService.deleteFile(oldTeamImage.image);
        }
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const team = await this.teamRepo.update(
        {
          image: image_name,
          ...updateTeamDto,
        },
        { where: { id } },
      );
      return {
        message: "Jamoa o'zgartirildi",
        team: team,
      };
    }
    const team = await this.teamRepo.update(updateTeamDto, {
      where: { id },
    });
    return {
      message: "Jamoa o'zgartirildi",
      team: team,
    };
  }
}
