import { Body, Controller, Inject, Post } from '@nestjs/common';
import { WxService } from '../wx/wx.service';
import { UserService } from './user.service';
import { UtilsService } from '../common/utils/utils.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(WxService) private readonly wxService: WxService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UtilsService) private readonly utilsService: UtilsService,
  ) {}

  @Post('login')
  async userLogin(@Body() payload) {
    const { code } = payload;

    const { session_key, openid } = await this.wxService.login(code);

    const user = await this.userService.findByOpenid(openid);

    if (!user) {
      await this.userService.createUser(openid);
    }

    const token = await this.utilsService.getAccessToken({
      session_key,
      openid,
    });

    return {
      token,
    };
  }
}
