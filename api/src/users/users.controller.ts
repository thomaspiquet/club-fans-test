import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FollowUserDto } from './dto/follow-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto).catch((error) => {
      if (error instanceof ConflictException) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll().catch((error) => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto).catch((error) => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id).catch((error) => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Post('/follow')
  follow(@Body() followUserDto: FollowUserDto) {
    return this.usersService.follow(followUserDto).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      if (error instanceof ConflictException) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
