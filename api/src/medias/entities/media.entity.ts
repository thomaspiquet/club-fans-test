import { User } from 'src/users/entities/user.entity';
import { ViewedMedia } from 'src/viewed-medias/entities/viewed-media';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, nullable: false })
  title: string;

  @Column({ length: 1024, nullable: false })
  description: string;

  @Column({ length: 256, nullable: false })
  URL: string;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.medias)
  user: User;

  @OneToMany(() => ViewedMedia, (viewedMedia) => viewedMedia.media)
  viewedMedias: ViewedMedia[];

  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    readonly: true,
    select: true,
    name: 'createdAt',
  })
  createdAt: Date;
}
