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

  @PrimaryColumn({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'int', nullable: false })
  category_id: number;

  @Column({ type: 'int', default: 1 })
  level: number;

  @Column({
    length: 30,
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({
    length: 200,
    type: 'varchar',
    nullable: false,
  })
  desc: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  support_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  price: number;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @OneToMany(() => AvatarImage, (avatar_image) => avatar_image.avatar)
  avatar_images: AvatarImage[];
}
