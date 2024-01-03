import { Controller, Get, Inject } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(
    @Inject(AvatarService) private readonly avatarService: AvatarService,
  ) {}

  @Get('list')
  async getAvatarList() {
    return await this.avatarService.getAvatarList();
  }
}
