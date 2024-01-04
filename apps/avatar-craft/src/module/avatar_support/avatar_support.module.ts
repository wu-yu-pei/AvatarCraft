import { Module } from '@nestjs/common';
import { AvatarSupportService } from './avatar_support.service';
import { AvatarSupportController } from './avatar_support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarSupport } from './avatar_support.entity';
import { AvatarModule } from '../avatar/avatar.module';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarSupport]), AvatarModule],
  controllers: [AvatarSupportController],
  providers: [AvatarSupportService],
})
export class AvatarSupportModule {}
