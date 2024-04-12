import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PartnershipsService } from './partnerships.service';
import { UpdatePartnershipsDto } from './dto/update-partnerships.dto';
import { Partnership } from './models/partnerships.model';
import { CreatePartnershipsDto } from './dto/create-partnershipsdto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';



@ApiTags("Hamkorlar")
@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipService: PartnershipsService) {}

  @ApiOperation({ summary: "Hamkor qo'shish" })
  @Roles("ADMIN")
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
    @Body() createPartnershipsDto: CreatePartnershipsDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.partnershipService.createPartnership(createPartnershipsDto, image);
  }

  @ApiOperation({ summary: "Hamkorni ko'rish" }) 
  @Get('find-all')
  async getAllPartnership() {
    return this.partnershipService.getAllPartnership();
  }

  @ApiOperation({ summary: "Hamkor ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOnePartnership(@Param("id") id: string): Promise<Partnership> {
    return this.partnershipService.getOnePartnership(+id);
  }

  @ApiOperation({ summary: "Hamkor ID si bo'yicha o'chirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOnePartnership(@Param("id") id: string) {
    return this.partnershipService.delOnePartnership(+id);
  }

  @ApiOperation({ summary: "Hamkor ID si bo'yicha o'zgartirish" })
  @Roles("ADMIN")
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
  async updatePartnership(
    @Param('id') id: string,
    @Body() updatePartnershipsDto: UpdatePartnershipsDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.partnershipService.updatePartnership(+id, updatePartnershipsDto, image);
  }
}