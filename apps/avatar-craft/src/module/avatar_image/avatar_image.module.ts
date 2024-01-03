import { Module } from '@nestjs/common';
import { AvatarImageController } from './avatar_image.controller';

@Module({
  controllers: [AvatarImageController],
})
export class AvatarImageModule {}
