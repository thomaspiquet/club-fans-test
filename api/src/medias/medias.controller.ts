import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.create(createMediaDto).catch((error) => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
  @Get()
  async findAll() {
    return await this.mediasService.findAll().catch((error) => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mediasService.findOne(+id).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return await this.mediasService
      .update(+id, updateMediaDto)
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mediasService.remove(+id).catch((error) => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
