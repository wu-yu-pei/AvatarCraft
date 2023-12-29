import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import defConfig from './config/def.config';
import devConfig from './config/dev.config';
import prodConfig from './config/prod.config';
import { isDev } from './utils';

@Module({
  imports: [...setupOptionalModules()],
  controllers: [AppController],
  providers: [AppService],
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

  const _TypeOrmModule = TypeOrmModule.forRootAsync({
    useFactory(configService: ConfigService) {
      console.log(configService.get('mysql_server_host'));

      return {
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: 'avatar_craft' || configService.get('mysql_server_database'),
        synchronize: true,
        logging: true,
        entities: [],
        poolSize: 10,
        connectorPackage: 'mysql',
      };
    },
    inject: [ConfigService],
  });

  return [_ConfigModule, _TypeOrmModule];
}
