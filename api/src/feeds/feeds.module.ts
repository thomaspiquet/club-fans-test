import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { UsersModule } from 'src/users/users.module';
import { MediasModule } from 'src/medias/medias.module';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, MediasModule],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
