import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { NewsService } from './news.service';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';
import { New } from './models/new.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';


@ApiTags("Yangiliklar")
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: "Yangilik qo'shish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createNewDto: CreateNewDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.newsService.createNew(createNewDto, image);
  }

  @ApiOperation({ summary: "Yangilikni ko'rish" }) 
  @Get('find-all')
  async getAllNew() {
    return this.newsService.getAllNew();
  }

  @ApiOperation({ summary: "Yangilik ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneNew(@Param("id") id: string): Promise<New> {
    return this.newsService.getOneNew(+id);
  }

  @ApiOperation({ summary: "Yangilik ID si bo'yicha o'chirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneNew(@Param("id") id: string) {
    return this.newsService.delOneNew(+id);
  }

  @ApiOperation({ summary: "Yangilik ID si bo'yicha o'zgartirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateNew(
    @Param('id') id: string,
    @Body() updateNewDto: UpdateNewDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.newsService.updateNew(+id, updateNewDto, image);
  }
}