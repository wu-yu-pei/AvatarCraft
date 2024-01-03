import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Avatar } from '../avatar/avatar.entity';

@Entity({
  name: 'avatar_image',
})
export class AvatarImage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @PrimaryColumn({ type: 'int' })
  avatar_id: number;

  @Column({ type: 'int' })
  status: number;

  @Column({
    length: 200,
    type: 'varchar',
  })
  url: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @ManyToOne(() => Avatar, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: Avatar;
}
