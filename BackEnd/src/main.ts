import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata'
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { miscService } from './Providers/misc.provider';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['fatal', 'error', 'warn', 'debug','verbose'],
    cors:true
  });
  app.enableCors();
  app.use(compression());
  app.enableVersioning({
  type: VersioningType.HEADER,
  header: 'V1.5',
});
  const configService = app.get(ConfigService);
  const port = configService.get<number>('NESTJS_PORT');

  


  await app.listen(port ?? 3000);
}
bootstrap();
