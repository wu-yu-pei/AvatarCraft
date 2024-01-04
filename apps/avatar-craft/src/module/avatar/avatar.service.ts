import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
  ) {}

  async getAvatarList({ page, pageSize }): Promise<Avatar[]> {
    return await this.avatarRepository.find({
      where: {
        status: 1,
      },
      skip: pageSize * (page - 1),
      take: pageSize,
      relations: {
        avatar_images: true,
      },
    });
  }

  // 点赞加一
  async likeIncrement(avatar_id: number) {
    await this.avatarRepository.increment({ id: avatar_id }, 'like_count', 1);

    return null;
  }

  // 点赞减一
  async likeDecrement(avatar_id: number) {
    await this.avatarRepository.decrement({ id: avatar_id }, 'like_count', 1);

    return null;
  }
}
