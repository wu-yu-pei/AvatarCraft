import { Inject, Injectable } from '@nestjs/common';
import { AvatarSupport } from './avatar_support.entity';
import { AvatarService } from '../avatar/avatar.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvatarSupportService {
  constructor(
    @InjectRepository(AvatarSupport)
    private readonly avatarSupportRepository: Repository<AvatarSupport>,
    @Inject(AvatarService) private readonly avatarService: AvatarService,
  ) {}

  async updateSupportCount(avatar_id, user) {
    // 点赞记录
    const supportLog = await this.findSupportLog(avatar_id, user.id);

    // 1. 有记录 更新状态
    if (supportLog) {
      await this.changeStatus(avatar_id, user.id, -supportLog.status);

      supportLog.status === 1
        ? await this.avatarService.supportDecrement(avatar_id)
        : await this.avatarService.supportIncrement(avatar_id);

      return 'ok';
    }

    // 2. 没记录 新增一条点赞记录
    await this.createSupportLog(avatar_id, user.id);
    await this.avatarService.supportIncrement(avatar_id);

    return 'ok';
  }

  async createSupportLog(avatar_id, user_id) {
    const avatarSupport = new AvatarSupport();

    avatarSupport.avatar_id = avatar_id;
    avatarSupport.status = 1;
    avatarSupport.user_id = user_id;

    await this.avatarSupportRepository.save(avatarSupport);
  }

  async findSupportLog(avatar_id, user_id) {
    const supportLog = await this.avatarSupportRepository.findOne({
      where: {
        avatar_id,
        user_id,
      },
    });

    return supportLog;
  }

  // 更新点赞状态
  async changeStatus(avatar_id, user_id, status) {
    await this.avatarSupportRepository.update(
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
