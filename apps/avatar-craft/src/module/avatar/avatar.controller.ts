import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(
    @Inject(AvatarService) private readonly avatarService: AvatarService,
  ) {}

  @Get('list')
  async getAvatarList(@Query() query) {
    const { page = 1, pageSize = 15 } = query;
    const result = await this.avatarService.getAvatarList({ page, pageSize });
    return { code: 200, data: result };
  }
}
