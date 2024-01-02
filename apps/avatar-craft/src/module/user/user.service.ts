import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByOpenid(openid: string): Promise<User> {
    const res = this.userRepository.findOne({
      where: {
        openid,
      },
    });

    return res;
  }

  async createUser(openid: string): Promise<void> {
    const user = new User();
    user.openid = openid;
    user.create_date = new Date();
    user.update_date = new Date();
    await this.userRepository.save(user);
  }
}
