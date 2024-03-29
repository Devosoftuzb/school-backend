import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
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



@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, Teacher, New, Partnership, Lesson],
      autoLoadModels: true,
      logging: false,
    }),
    AdminsModule,
    TeachersModule,
    NewsModule,
    PartnershipsModule,
    AdditionalLessonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}