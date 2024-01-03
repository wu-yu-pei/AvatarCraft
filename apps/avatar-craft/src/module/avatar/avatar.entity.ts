import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AvatarImage } from '../avatar_image/avatar_image.entity';

@Entity({
  name: 'avatar',
})
export class Avatar {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @PrimaryColumn({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'int' })
  level: number;

  @Column({
    length: 30,
    type: 'varchar',
  })
  title: string;

  @Column({ type: 'int' })
  status: number;

  @Column({
    length: 200,
    type: 'varchar',
  })
  desc: string;

  @Column({ type: 'int' })
  view_count: number;

  @Column({ type: 'int' })
  support_count: number;

  @Column({ type: 'int' })
  like_count: number;

  @Column({ type: 'varchar', length: 10 })
  price: number;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @OneToMany(() => AvatarImage, (avatar_image) => avatar_image.avatar)
  avatar_images: AvatarImage[];
}
