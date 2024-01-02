import { Module } from '@nestjs/common';
import { WxService } from './wx.service';

@Module({
  providers: [WxService],
  exports: [WxService],
})
export class WxModule {}
