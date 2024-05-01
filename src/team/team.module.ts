import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';
import { Team } from './models/team.model';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [SequelizeModule.forFeature([Team]), JwtModule, FilesModule],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}