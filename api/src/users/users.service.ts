import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const alreadyExistingUser = await this.usersRepository
      .findOneBy({
        username: createUserDto.username,
      })
      .catch((error) => {
        throw error;
      });

    if (alreadyExistingUser) {
      throw new ConflictException(`username is already in use`);
    } else {
      return await this.usersRepository.save(createUserDto).catch((error) => {
        throw error;
      });
    }
  }

  async findAll() {
    return await this.usersRepository.find().catch((error) => {
      throw error;
    });
  }

  async findOne(id: number) {
    const user: User = await this.usersRepository
      .findOneBy({ id })
      .catch((error) => {
        throw error;
      });

    if (!user) {
      throw new NotFoundException(`user don't exist`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository
      .update({ id }, updateUserDto)
      .catch((error) => {
        throw error;
      });
  }

  async remove(id: number) {
    // Must implement a soft delete
    // Or delete all his medias before deleting him.
    return await this.usersRepository.delete({ id }).catch((error) => {
      throw error;
    });
  }

  async follow(followUserDto: FollowUserDto) {
    const selfUser = await this.usersRepository
      .findOne({
        where: { id: followUserDto.selfId },
        relations: ['following'],
      })
      .catch((error) => {
        throw error;
      });

    const userToFollow = await this.usersRepository
      .findOne({
        where: { id: followUserDto.userToFollowId },
      })
      .catch((error) => {
        throw error;
      });

    if (!selfUser) {
      throw new NotFoundException(`unable to found self user`);
    }

    if (!userToFollow) {
      throw new NotFoundException(`unable to found user to follow`);
    }

    if (
      selfUser.following.some((el) => el.id === followUserDto.userToFollowId)
    ) {
      throw new ConflictException(`user already followed`);
    }

    selfUser.following.push(userToFollow);

    await this.usersRepository.save(selfUser).catch((error) => {
      throw error;
    });

    return { success: true };
  }
}
