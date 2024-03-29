import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './models/teacher.model';

@ApiTags("O'qtuvchilar")
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @ApiOperation({ summary: "O'qituvchi qo'shish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createTeacherDto: CreateTeacherDto, @Res({ passthrough: true }) res: Response) {
    return this.teachersService.createTeacher(createTeacherDto, res);
  }

  @ApiOperation({ summary: "O'qituvchini ko'rish" }) 
  @Get('find-all')
  async getAllTeacher() {
    return this.teachersService.getAllTeacher();
  }

  @ApiOperation({ summary: "O'qituvchi ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneTeacher(@Param("id") id: string): Promise<Teacher> {
    return this.teachersService.getOneTeacher(+id);
  }

  @ApiOperation({ summary: "O'qituvchi ID si bo'yicha o'chirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneTeacher(@Param("id") id: string) {
    return this.teachersService.delOneTeacher(+id);
  }

  @ApiOperation({ summary: "O'qituvchi ID si bo'yicha o'zgartirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.updateTeacher(+id, updateTeacherDto);
  }
}