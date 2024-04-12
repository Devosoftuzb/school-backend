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
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './models/teacher.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';

@ApiTags("O'qtuvchilar")
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @ApiOperation({ summary: "O'qituvchi qo'shish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createTeacherDto: CreateTeacherDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.teachersService.createTeacher(createTeacherDto, image);
  }

  @ApiOperation({ summary: "O'qituvchini ko'rish" })
  @Get('find-all')
  async getAllTeacher() {
    return this.teachersService.getAllTeacher();
  }

  @ApiOperation({ summary: "O'qituvchi ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneTeacher(@Param('id') id: string): Promise<Teacher> {
    return this.teachersService.getOneTeacher(+id);
  }

  @ApiOperation({ summary: "O'qituvchi ID si bo'yicha o'chirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneTeacher(@Param('id') id: string) {
    return this.teachersService.delOneTeacher(+id);
  }

  @ApiOperation({ summary: "O'qituvchi ID si bo'yicha o'zgartirish" })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateTeacher(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.teachersService.updateTeacher(+id, updateTeacherDto, image);
  }
}
