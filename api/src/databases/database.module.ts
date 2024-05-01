import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Media } from '../medias/entities/media.entity';
import { ViewedMedia } from 'src/viewed-medias/entities/viewed-media';

export class DatabaseModule {
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            type: 'mysql',
            host: config.get('DB_HOST'),
            port: config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            entities: [User, Media, ViewedMedia],
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
