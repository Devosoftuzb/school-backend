import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Lesson } from './models/lesson.model';
import { AdditionalLessonsController } from './additional-lessons.controller';
import { AdditionalLessonsService } from './additional-lessons.service';
import { FilesModule } from 'src/files/files.module';



@Module({
  imports: [SequelizeModule.forFeature([Lesson]), JwtModule, FilesModule],
  controllers: [AdditionalLessonsController],
  providers: [AdditionalLessonsService]
})
export class AdditionalLessonsModule {}