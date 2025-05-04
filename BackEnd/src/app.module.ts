import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './Entities/users';
import { Conditions } from './Entities/conditions';
import { Categories } from './Entities/categories';
import { Task, taskView } from './Entities/tasks';

import { miscService } from './Providers/misc.provider';
import { taskViewService } from './Providers/task.provider';
import { UserService } from './Providers/user.provider';
import { MiscController } from './Controllers/misc/misc.controller';
import { TaskController } from './Controllers/task/task.controller';
import { UserController } from './Controllers/user/user.controller';
import { Threats } from './Entities/threats';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
        type:'postgres',
        host:configService.get<string>('HOST'),
        port:configService.get<number>('DB_PORT'),
        username:configService.get<string>('USERNAME'),
        password:configService.get<string>('PASSWORD'),
        database:configService.get<string>('DB'),
        entities: [
          User,
          Task,
          Conditions,
          Categories,
          taskView,
          Threats
        ],
        synchronize:true,
        logging:true,
        autoLoadEntities:true
      })
    }),
    TypeOrmModule.forFeature([
      User,
      Conditions,
      Categories,
      Task,
      taskView,
      Threats
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
export class AppModule {
}
