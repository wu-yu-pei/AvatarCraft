import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: true,
  })
  unionid: string;

  @Column({
    length: 100,
    type: 'varchar',
  })
  openid: string;

  @Column({
    length: 50,
    type: 'varchar',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  sex: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
