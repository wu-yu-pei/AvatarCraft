import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import defConfig from './config/def.config';
import devConfig from './config/dev.config';
import prodConfig from './config/prod.config';
import { ConfigModule } from '@nestjs/config';
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
  return [_ConfigModule];
}
