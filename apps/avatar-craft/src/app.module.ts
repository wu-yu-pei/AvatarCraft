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
import { UtilsModule } from './module/common/utils/utils.module';
import { User } from './module/user/user.entity';
import { AvatarModule } from './module/avatar/avatar.module';
import { AvatarImageService } from './module/avatar_image/avatar_image.service';
import { AvatarImageModule } from './module/avatar_image/avatar_image.module';
import { Avatar } from './module/avatar/avatar.entity';
import { AvatarImage } from './module/avatar_image/avatar_image.entity';

@Module({
  imports: [
    ...setupOptionalModules(),
    UserModule,
    WxModule,
    UtilsModule,
    AvatarModule,
    AvatarImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AvatarImageService],
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
      console.log(configService.get('mysql_server_host'));

      return {
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
        synchronize: true,
        logging: true,
        entities: [User, Avatar, AvatarImage],
        poolSize: 10,
        connectorPackage: 'mysql2',
      };
    },
    inject: [ConfigService],
  });

  return [_ConfigModule, _JwtModule, _TypeOrmModule];
}
