import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Lesson } from './models/lesson.model';
import { AdditionalLessonsController } from './additional-lessons.controller';
import { AdditionalLessonsService } from './additional-lessons.service';



@Module({
  imports: [SequelizeModule.forFeature([Lesson]), JwtModule],
  controllers: [AdditionalLessonsController],
  providers: [AdditionalLessonsService]
})
export class AdditionalLessonsModule {}