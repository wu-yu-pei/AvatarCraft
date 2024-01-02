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
  })
  phone: string;

  @Column({
    type: 'tinyint',
  })
  sex: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
