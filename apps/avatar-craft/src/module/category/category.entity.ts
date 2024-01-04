import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'category',
})
export class Category {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  status: number;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  level: number;

  @Column({ type: 'varchar', nullable: false, default: 'null' })
  cover_image: string;

  @CreateDateColumn({ nullable: false })
  create_date: Date;

  @UpdateDateColumn({ nullable: false })
  update_date: Date;
}
