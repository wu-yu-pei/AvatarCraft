import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { WxService } from '../wx/wx.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(WxService) private readonly wxService: WxService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByOpenid(openid: string): Promise<User> {
    const res = await this.userRepository.findOne({
      where: {
        openid,
      },
    });

    return res;
  }

  async createUser(openid: string): Promise<User> {
    const user = new User();

    user.openid = openid;
    user.create_date = new Date();
    user.update_date = new Date();

    return await this.userRepository.save(user);
  }
}
