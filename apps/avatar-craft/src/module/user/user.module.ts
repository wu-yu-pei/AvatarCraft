import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WxModule } from '../wx/wx.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WxModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
