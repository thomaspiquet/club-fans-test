import { Media } from 'src/medias/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('viewed_media')
export class ViewedMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.viewedMedias)
  user: User;

  @ManyToOne(() => Media, (media) => media.viewedMedias)
  media: Media;
}
