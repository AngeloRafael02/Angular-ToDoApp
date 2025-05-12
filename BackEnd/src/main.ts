import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const configService = app.get(ConfigService);
  const port = configService.get<number>('NESTJS_PORT');
  await app.listen(port ?? 3000);
}
bootstrap();
