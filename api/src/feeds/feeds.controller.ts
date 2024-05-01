import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Get()
  async findOne(
    @Query('id') id: number,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.feedsService.getFeed(+id, +page, +limit).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }
}
