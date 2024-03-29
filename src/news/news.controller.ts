import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { NewsService } from './news.service';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';
import { New } from './models/new.model';


@ApiTags("Yangiliklar")
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: "Yangilik qo'shish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createNewDto: CreateNewDto, @Res({ passthrough: true }) res: Response) {
    return this.newsService.createNew(createNewDto, res);
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
  @Put("update/:id")
  async updateNew(@Param('id') id: string, @Body() updateNewDto: UpdateNewDto) {
    return this.newsService.updateNew(+id, updateNewDto);
  }
}