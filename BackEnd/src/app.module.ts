import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './Entities/users';
import { Conditions } from './Entities/conditions';
import { Categories } from './Entities/categories';
import { Task, taskView } from './Entities/tasks';

import { miscService, taskViewService, UserService } from './Providers/psql.provider';
import { MiscController } from './Controllers/misc/misc.controller';
import { TaskController } from './Controllers/task/task.controller';
import { UserController } from './Controllers/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        password: configService.get<string>('PASSWORD'),
        username: configService.get<string>('USERNAME'),
        entities: [
          User,
          Task,
          Conditions,
          Categories,
          taskView
          ],
        database: 'tododb',
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      User,
      Conditions,
      Categories,
      Task,
      taskView
    ]),
  ],
  controllers: [
    AppController,
    MiscController,
    TaskController,
    UserController,
  ],
  providers: [
    AppService, 
    miscService,
    taskViewService,
    UserService,
  ],
})
export class AppModule {}
