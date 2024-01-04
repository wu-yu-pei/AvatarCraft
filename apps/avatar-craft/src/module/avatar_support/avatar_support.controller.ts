import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AvatarSupportService } from './avatar_support.service';
import { Auth } from '../../decorator/auth.decorator';
import { UserInfo } from '../../decorator/userInfo.decorator';

@Controller('avatar-support')
export class AvatarSupportController {
  constructor(
    @Inject(AvatarSupportService)
    private readonly avatarSupportService: AvatarSupportService,
  ) {}

  @Post()
  @Auth()
  async avatarLike(@Body() payload, @UserInfo() user) {
    const { avatar_id } = payload;
    return await this.avatarSupportService.updateSupportCount(avatar_id, user);
  }
}
