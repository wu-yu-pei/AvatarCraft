import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { FormatResponseInterceptor } from './interceptor/format-response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  usePrefix(app);

  const PORT = app.get(ConfigService).get('nest_server_port');

  app.useGlobalInterceptors(new FormatResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);

  console.log(`|--> Nest is running on http://localhost:${PORT} <--|`);
}

bootstrap();

function usePrefix(app: INestApplication) {
  app.setGlobalPrefix(app.get(ConfigService).get('prefix'));
}
