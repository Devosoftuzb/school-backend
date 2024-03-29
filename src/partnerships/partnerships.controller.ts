import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PartnershipsService } from './partnerships.service';
import { UpdatePartnershipsDto } from './dto/update-partnerships.dto';
import { Partnership } from './models/partnerships.model';
import { CreatePartnershipsDto } from './dto/create-partnershipsdto';



@ApiTags("Hamkorlar")
@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipService: PartnershipsService) {}

  @ApiOperation({ summary: "Hamkor qo'shish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createPartnershipDto: CreatePartnershipsDto, @Res({ passthrough: true }) res: Response) {
    return this.partnershipService.createPartnership(createPartnershipDto, res);
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
  @Put("update/:id")
  async updatePartnership(@Param('id') id: string, @Body() updatePartnershipDto: UpdatePartnershipsDto) {
    return this.partnershipService.updatePartnership(+id, updatePartnershipDto);
  }
}