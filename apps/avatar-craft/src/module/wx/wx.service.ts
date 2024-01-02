import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

type wxAccessTokenResponse = {
  access_token: string;
  expires_in: number;
};

type wxLoginResponse = {
  session_key: string;
  unionid?: string;
  errmsg?: string;
  openid: string;
  errcode?: number;
};

@Injectable()
export class WxService {
  public appid: string;
  public appSecret: string;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.appid = this.configService.get('app_id');
    this.appSecret = this.configService.get('app_secret');
  }

  // 获取access_token
  async getAccessToken(): Promise<wxAccessTokenResponse> {
    const res = await axios.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.appSecret}`,
    );

    return res.data;
  }

  // 根据code 进行登陆
  async login(code): Promise<wxLoginResponse> {
    const res = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`,
    );

    return res.data;
  }

  // 根据code 获取手机号
  async getPhone(code): Promise<any> {
    const { access_token } = await this.getAccessToken();

    const res = await axios.post(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`,
      { code },
    );

    return res.data.phone_info;
  }
}
