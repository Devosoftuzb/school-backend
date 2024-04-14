import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { AdditionalLessonsService } from './additional-lessons.service';
import { CreateLessonDto } from './dto/create-lessons.dto';
import { UpdateLessonDto } from './dto/update-lessons.dto';
import { Lesson } from './models/lesson.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';

@ApiTags("To'garaklar")
@Controller('lessons')
export class AdditionalLessonsController {
  constructor(private readonly lessonsService: AdditionalLessonsService) {}

  @ApiOperation({ summary: "To'garak qo'shish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.lessonsService.createLesson(createLessonDto, image);
  }

  @ApiOperation({ summary: "To'garakni ko'rish" })
  @Get('find-all')
  async getAllLesson() {
    return this.lessonsService.getAllLesson();
  }

  @ApiOperation({ summary: "To'garak ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneLesson(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.getOneLesson(+id);
  }

  @ApiOperation({ summary: "To'garak ID si bo'yicha o'chirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneLesson(@Param('id') id: string) {
    return this.lessonsService.delOneLesson(+id);
  }

  @ApiOperation({ summary: "To'garak ID si bo'yicha o'zgartirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.lessonsService.updateLesson(+id, updateLessonDto, image);
  }
}
