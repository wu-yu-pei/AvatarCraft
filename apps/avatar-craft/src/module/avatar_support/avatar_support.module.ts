import { Module } from '@nestjs/common';
import { AvatarSupportService } from './avatar_support.service';
import { AvatarSupportController } from './avatar_support.controller';

@Module({
  controllers: [AvatarSupportController],
  providers: [AvatarSupportService],
})
export class AvatarSupportModule {}
