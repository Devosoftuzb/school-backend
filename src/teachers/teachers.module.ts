import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { JwtModule } from '@nestjs/jwt';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [SequelizeModule.forFeature([Teacher]), JwtModule],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}