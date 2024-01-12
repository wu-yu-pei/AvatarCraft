import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import defConfig from './config/def.config';
import devConfig from './config/dev.config';
import prodConfig from './config/prod.config';
import { isDev } from './utils';
import { UserModule } from './module/user/user.module';
import { WxModule } from './module/wx/wx.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UtilsModule } from './module/common/utils/utils.module';
import { User } from './module/user/user.entity';
import { AvatarModule } from './module/avatar/avatar.module';
import { AvatarImageModule } from './module/avatar_image/avatar_image.module';
import { Avatar } from './module/avatar/avatar.entity';
import { AvatarImage } from './module/avatar_image/avatar_image.entity';
import { AvatarLikeModule } from './module/avatar_like/avatar_like.module';
import { AvatarSupportModule } from './module/avatar_support/avatar_support.module';
import { AvatarLike } from './module/avatar_like/avatar_like.entity';
import { AvatarSupport } from './module/avatar_support/avatar_support.entity';
import { CategoryModule } from './module/category/category.module';
import { Category } from './module/category/category.entity';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/auth.guard';
import * as path from 'path';

@Module({
  imports: [
    ...setupOptionalModules(),
    UserModule,
    WxModule,
    UtilsModule,
    AvatarModule,
    AvatarImageModule,
    AvatarLikeModule,
    AvatarSupportModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}

/**
 * setup all need optional module
 * @returns {Array} Modules
 */

function setupOptionalModules() {
  const _ConfigModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [defConfig, isDev() ? devConfig : prodConfig],
  });

  const _JwtModule = JwtModule.registerAsync({
    global: true,
    useFactory(configService: ConfigService) {
      return {
        secret: configService.get('jwt_secret'),
        signOptions: {
          expiresIn: configService.get('jwt_access_token_expires_time'),
        },
      };
    },
    inject: [ConfigService],
  });

  const _TypeOrmModule = TypeOrmModule.forRootAsync({
    useFactory(configService: ConfigService) {
      return {
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
        synchronize: true,
        logging: false,
        entities: [
          User,
          Avatar,
          Category,
          AvatarImage,
          AvatarLike,
          AvatarSupport,
        ],
        poolSize: 10,
        connectorPackage: 'mysql2',
      };
    },
    inject: [ConfigService],
  });

  const _ServeStaticModule = ServeStaticModule.forRootAsync({
    useFactory(configService: ConfigService) {
      const fileSavePath = configService.get('fileSavePath');
      console.log(fileSavePath);

      return [{ serveRoot: '/images', rootPath: path.join(fileSavePath) }];
    },
    inject: [ConfigService],
  });

  return [_ConfigModule, _JwtModule, _TypeOrmModule, _ServeStaticModule];
}
