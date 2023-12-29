import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = app.get(ConfigService).get('nest_server_port');

  await app.listen(PORT);

  console.log(`|--> Nest is running on http://localhost:${PORT} <--|`);
}
bootstrap();
