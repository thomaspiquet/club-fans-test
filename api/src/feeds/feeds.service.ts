import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getFeed(id: number, page: number, limit: number) {
    // Select user from id with his following
    const selfUser: User = await this.usersRepository
      .findOne({
        where: { id },
        relations: ['following'],
      })
      .catch((error) => {
        throw error;
      });

    if (!selfUser) {
      throw new NotFoundException(`user not found`);
    }

    if (selfUser.following.length === 0) {
      throw new NotFoundException(`user don't follow other users yet`);
    }

    // Look in media for every rows where userId is contained in the users I follow.
    // Then select only medias which are not already in viewed_media.
    // Then order them most recent first.
    // Finally paginate with limit & offset.
    const feed = await this.usersRepository
      .query(
        `
        SELECT * FROM media
        WHERE media.userId IN (?)
        AND NOT EXISTS (
          SELECT 1 FROM viewed_media
          WHERE viewed_media.mediaId = media.id
          AND viewed_media.userId = ?
        )
        ORDER BY media.createdAt DESC
        LIMIT ? OFFSET ?;`,
        [selfUser.following.map((el) => el.id), selfUser.id, limit, page],
      )
      .catch((error) => {
        throw error;
      });

    // If medias are retrieved, mark them in viewed_media
    if (feed.length > 0) {
      // Insert into viewed_media the pair selfId and mediaId
      const alreadySeenQuery = `INSERT INTO viewed_media (userId, mediaId) VALUES ?`;
      await this.usersRepository
        .query(alreadySeenQuery, [feed.map((el) => [selfUser.id, el.id])])
        .catch((error) => {
          throw error;
        });
    }

    return feed;
  }
}
