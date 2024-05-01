import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './databases/database.module';

import { UsersModule } from './users/users.module';
import { MediasModule } from './medias/medias.module';
import { FeedsModule } from './feeds/feeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [`.env`] }),
    DatabaseModule.forRoot(),
    UsersModule,
    MediasModule,
    FeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
