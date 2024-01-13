import { Body, Controller, Inject, Post } from '@nestjs/common';
import { WxService } from '../wx/wx.service';
import { UserService } from './user.service';
import { UtilsService } from '../common/utils/utils.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    @Inject(WxService) private readonly wxService: WxService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UtilsService) private readonly utilsService: UtilsService,
  ) {}

  @Post('login')
  async userLogin(@Body() payload) {
    const { loginCode } = payload;

    const { session_key, openid } = await this.wxService.login(loginCode);
    let user: User = await this.userService.findByOpenid(openid);

    if (!user) {
      user = await this.userService.createUser(openid);
    }

    const token = this.utilsService.getAccessToken({
      session_key,
      openid,
      id: user.id,
    });

    return {
      token,
    };
  }
}
