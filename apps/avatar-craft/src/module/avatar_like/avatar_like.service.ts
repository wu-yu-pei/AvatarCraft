import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarLike } from './avatar_like.entity';
import { Repository } from 'typeorm';
import { AvatarService } from '../avatar/avatar.service';

@Injectable()
export class AvatarLikeService {
  constructor(
    @InjectRepository(AvatarLike)
    private readonly avatarLikeRepository: Repository<AvatarLike>,
    @Inject(AvatarService) private readonly avatarService: AvatarService,
  ) {}

  async updateLikeCount(avatar_id, user) {
    // 点赞记录
    const likeLog = await this.findLikeLog(avatar_id, user.id);

    // 1. 有记录 更新状态
    if (likeLog) {
      await this.changeStatus(avatar_id, user.id, -likeLog.status);

      likeLog.status === 1
        ? await this.avatarService.likeDecrement(avatar_id)
        : await this.avatarService.likeIncrement(avatar_id);

      return 'ok';
    }

    // 2. 没记录 新增一条点赞记录
    await this.createLikeLog(avatar_id, user.id);
    await this.avatarService.likeIncrement(avatar_id);

    return 'ok';
  }

  async createLikeLog(avatar_id, user_id) {
    const avatarLike = new AvatarLike();

    avatarLike.avatar_id = avatar_id;
    avatarLike.status = 1;
    avatarLike.user_id = user_id;

    await this.avatarLikeRepository.save(avatarLike);
  }

  async findLikeLog(avatar_id, user_id) {
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
