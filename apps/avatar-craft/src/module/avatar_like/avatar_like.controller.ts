import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AvatarLikeService } from './avatar_like.service';
import { Auth } from '../../decorator/auth.decorator';
import { UserInfo } from '../../decorator/userInfo.decorator';

@Controller('avatar-like')
export class AvatarLikeController {
  constructor(
    @Inject(AvatarLikeService)
    private readonly avatarLikeService: AvatarLikeService,
  ) {}

  @Post()
  @Auth()
  async avatarLike(@Body() payload, @UserInfo() user) {
    const { avatar_id } = payload;
    return await this.avatarLikeService.avatarLike(avatar_id, user);
  }
}
