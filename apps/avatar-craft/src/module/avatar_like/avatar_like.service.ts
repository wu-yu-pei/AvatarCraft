import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarLike } from './avatar_like.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AvatarLikeService {
  constructor(
    @InjectRepository(AvatarLike)
    private readonly avatarLikeRepository: Repository<AvatarLike>,
  ) {}

  async avatarLike(avatar_id: number, user: User) {
    const isHasLike = await this.avatarLikeRepository.findOne({
      where: {
        avatar_id,
        user_id: user.id,
      },
    });

    if (isHasLike) {
      return { code: 210, msg: '谢谢你的点赞，不可以重复点哦' };
    }

    const avatarLike = new AvatarLike();
    avatarLike.avatar_id = avatar_id;
    avatarLike.status = 1;
    avatarLike.user_id = user.id;
    return await this.avatarLikeRepository.save(avatarLike);
  }
}
