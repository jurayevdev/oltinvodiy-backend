import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';
import { SocialMedia } from './models/social-media.model';




@Module({
  imports: [SequelizeModule.forFeature([SocialMedia]), JwtModule],
  controllers: [SocialMediaController],
  providers: [SocialMediaService]
})
export class SocialMediaModule {}