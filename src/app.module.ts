import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/models/admin.model';
import { TeachersModule } from './teachers/teachers.module';
import { Teacher } from './teachers/models/teacher.model';
import { NewsModule } from './news/news.module';
import { PartnershipsModule } from './partnerships/partnerships.module';
import { AdditionalLessonsModule } from './additional-lessons/additional-lessons.module';
import { New } from './news/models/new.model';
import { Partnership } from './partnerships/models/partnerships.model';
import { Lesson } from './additional-lessons/models/lesson.model';
import { FilesModule } from './files/files.module';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/models/contact.model';



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
      models: [Admin, Teacher, New, Partnership, Lesson, Contact],
      autoLoadModels: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AdminsModule,
    TeachersModule,
    NewsModule,
    PartnershipsModule,
    AdditionalLessonsModule,  
    FilesModule,
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}