import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { New } from './models/new.model';
import { JwtModule } from '@nestjs/jwt';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { FilesModule } from 'src/files/files.module';


@Module({
  imports: [SequelizeModule.forFeature([New]), JwtModule, FilesModule],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}