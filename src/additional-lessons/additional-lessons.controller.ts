import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { AdditionalLessonsService } from './additional-lessons.service';
import { CreateLessonDto } from './dto/create-lessons.dto';
import { UpdateLessonDto } from './dto/update-lessons.dto';
import { Lesson } from './models/lesson.model';



@ApiTags("To'garaklar")
@Controller('lessons')
export class AdditionalLessonsController {
  constructor(private readonly lessonsService: AdditionalLessonsService) {}

  @ApiOperation({ summary: "To'garak qo'shish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createLessonDto: CreateLessonDto, @Res({ passthrough: true }) res: Response) {
    return this.lessonsService.createLesson(createLessonDto, res);
  }

  @ApiOperation({ summary: "To'garakni ko'rish" }) 
  @Get('find-all')
  async getAllLesson() {
    return this.lessonsService.getAllLesson();
  }

  @ApiOperation({ summary: "To'garak ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneLesson(@Param("id") id: string): Promise<Lesson> {
    return this.lessonsService.getOneLesson(+id);
  }

  @ApiOperation({ summary: "To'garak ID si bo'yicha o'chirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneLesson(@Param("id") id: string) {
    return this.lessonsService.delOneLesson(+id);
  }

  @ApiOperation({ summary: "To'garak ID si bo'yicha o'zgartirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateLesson(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.updateLesson(+id, updateLessonDto);
  }
}