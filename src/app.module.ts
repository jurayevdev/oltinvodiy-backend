import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/models/admin.model';
import { FilesModule } from './files/files.module';
import { TeamModule } from './team/team.module';
import { MenuModule } from './menu/menu.module';
import { Team } from './team/models/team.model';
import { Menu } from './menu/models/menu.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/models/contact.model';
import { GalleryModule } from './gallery/gallery.module';
import { Gallery } from './gallery/models/gallery.model';
import { SocialMediaModule } from './social-media/social-media.module';
import { SocialMedia } from './social-media/models/social-media.model';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASS),
      database: process.env.POSTGRES_DB,
      models: [Admin, Team, Menu, Category, Contact, Gallery, SocialMedia],
      autoLoadModels: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'uploads'),
    }),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
    }),
    FilesModule,
    AdminsModule,
    TeamModule,
    MenuModule,
    CategoryModule,
    ContactModule,
    GalleryModule,
    SocialMediaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}