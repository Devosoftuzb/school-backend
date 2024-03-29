import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Partnership } from './models/partnerships.model';
import { PartnershipsController } from './partnerships.controller';
import { PartnershipsService } from './partnerships.service';
import { FilesModule } from 'src/files/files.module';


@Module({
  imports: [SequelizeModule.forFeature([Partnership]), JwtModule, FilesModule],
  controllers: [PartnershipsController],
  providers: [PartnershipsService]
})
export class PartnershipsModule {}