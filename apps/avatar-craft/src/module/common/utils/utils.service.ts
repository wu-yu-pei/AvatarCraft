import * as crypto from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenJwtPayload } from '../interface';

@Injectable()
export class UtilsService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  md5(str) {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
  }

  isDev() {
    return process.env.NODE_ENV === 'development';
  }

  getAccessToken(payload: AccessTokenJwtPayload) {
    return this.jwtService.sign(
      {
        openid: payload.openid,
        session_key: payload.session_key,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );
  }
}
