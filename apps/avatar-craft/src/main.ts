import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  usePrefix(app);

  const PORT = app.get(ConfigService).get('nest_server_port');

  await app.listen(PORT);

  console.log(`|--> Nest is running on http://localhost:${PORT} <--|`);
}

bootstrap();

function usePrefix(app: INestApplication) {
  app.setGlobalPrefix(app.get(ConfigService).get('prefix'));
}
