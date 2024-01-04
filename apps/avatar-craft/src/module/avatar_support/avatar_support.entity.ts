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
  name: 'avatar_support',
})
export class AvatarSupport {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @PrimaryColumn({ type: 'int', nullable: false })
  avatar_id: number;

  @PrimaryColumn({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status: number;

  @CreateDateColumn({ nullable: false })
  create_date: Date;

  @UpdateDateColumn({ nullable: false })
  update_date: Date;

  @ManyToOne(() => Avatar, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: Avatar;
}
