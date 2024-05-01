import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media) private mediasRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.mediasRepository.save(createMediaDto).catch((error) => {
      throw error;
    });
  }

  async findAll() {
    return await this.mediasRepository.find().catch((error) => {
      throw error;
    });
  }

  async findOne(id: number) {
    const media: Media = await this.mediasRepository
      .findOneBy({ id })
      .catch((error) => {
        throw error;
      });

    if (!media) {
      throw new NotFoundException(`media don't exist`);
    }

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    return await this.mediasRepository
      .update({ id }, updateMediaDto)
      .catch((error) => {
        throw error;
      });
  }

  async remove(id: number) {
    return await this.mediasRepository.delete({ id }).catch((error) => {
      throw error;
    });
  }
}
