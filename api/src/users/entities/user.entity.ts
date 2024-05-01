import { Media } from 'src/medias/entities/media.entity';
import { ViewedMedia } from 'src/viewed-medias/entities/viewed-media';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true, nullable: false })
  username: string;

  @Column({ length: 64, nullable: false })
  email: string;

  @Column({ length: 1024, nullable: false })
  description: string;

  @Column({ length: 256, nullable: false })
  profilePictureURL: string;

  @OneToMany(() => Media, (media) => media.user)
  medias: Media[];

  @OneToMany(() => ViewedMedia, (viewedMedia) => viewedMedia.user)
  viewedMedias: ViewedMedia[];

  @ManyToMany((type) => User, (user) => user.following)
  @JoinTable()
  following: User[];
}
