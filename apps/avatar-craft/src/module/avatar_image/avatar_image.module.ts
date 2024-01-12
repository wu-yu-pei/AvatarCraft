import { Module } from '@nestjs/common';
import { AvatarImageController } from './avatar_image.controller';
import { AvatarImageService } from './avatar_image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarImage } from './avatar_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarImage])],
  controllers: [AvatarImageController],
  providers: [AvatarImageService],
})
export class AvatarImageModule {}
