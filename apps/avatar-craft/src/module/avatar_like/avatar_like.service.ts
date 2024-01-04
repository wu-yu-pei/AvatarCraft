import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarLike } from './avatar_like.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { AvatarService } from '../avatar/avatar.service';

@Injectable()
export class AvatarLikeService {
  constructor(
    @InjectRepository(AvatarLike)
    private readonly avatarLikeRepository: Repository<AvatarLike>,
    @Inject(AvatarService) private readonly avatarService: AvatarService,
  ) {}

  async updateLikeCount(avatar_id, user, flag) {
    if (flag) {
      return await this.avatarLike(avatar_id, user);
    } else {
      return await this.avatarUnLike(avatar_id, user);
    }
  }

  // 点赞
  async avatarLike(avatar_id: number, user: User) {
    const isHasLike = await this.checkIsHasLikeLog(avatar_id, user.id);

    if (!isHasLike) {
      // 新增一条点赞记录
      const avatarLike = new AvatarLike();
      avatarLike.avatar_id = avatar_id;
      avatarLike.status = 1;
      avatarLike.user_id = user.id;
      await this.avatarLikeRepository.save(avatarLike);

      // 更新点赞数量
      await this.avatarService.likeIncrement(avatar_id);
    }

    if (isHasLike && isHasLike.status === -1) {
      // 更新点赞状态
      await this.changeStatus(avatar_id, user.id, 1);

      // 更新点赞数量
      await this.avatarService.likeIncrement(avatar_id);
    }

    return { msg: '已点赞' };
  }

  // 取消点赞
  async avatarUnLike(avatar_id: number, user: User) {
    const isHasLikeLog = await this.checkIsHasLikeLog(avatar_id, user.id);

    if (!isHasLikeLog || isHasLikeLog.status === -1) {
      return { code: 210, msg: '你未点赞' };
    }

    // 改变状态
    await this.changeStatus(avatar_id, user.id, -1);

    // 更新点赞数量
    await this.avatarService.likeDecrement(avatar_id);

    return { msg: '取消点赞' };
  }

  async checkIsHasLikeLog(avatar_id, user_id) {
    const isHasLike = await this.avatarLikeRepository.findOne({
      where: {
        avatar_id,
        user_id,
      },
    });

    return isHasLike;
  }

  // 更新点赞状态
  async changeStatus(avatar_id, user_id, status) {
    await this.avatarLikeRepository.update(
      {
        avatar_id,
        user_id,
      },
      {
        status,
      },
    );
  }
}
