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

  async getAvatarList(): Promise<Avatar[]> {
    return await this.avatarRepository.find({
      where: {
        status: 1,
      },
      relations: {
        avatar_images: true,
      },
    });
  }
}
