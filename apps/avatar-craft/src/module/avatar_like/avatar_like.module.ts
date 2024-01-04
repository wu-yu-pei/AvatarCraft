import { Module } from '@nestjs/common';
import { AvatarLikeService } from './avatar_like.service';
import { AvatarLikeController } from './avatar_like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarLike } from './avatar_like.entity';
import { AvatarModule } from '../avatar/avatar.module';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarLike]), AvatarModule],
  controllers: [AvatarLikeController],
  providers: [AvatarLikeService],
})
export class AvatarLikeModule {}
