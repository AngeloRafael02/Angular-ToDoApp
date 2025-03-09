import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { User } from './Entities/users';
import { Conditions } from './Entities/conditions';
import { Categories } from './Entities/categories';
import { Task, taskView } from './Entities/tasks';

import { miscService, TaskService, UserService } from './Providers/psql.provider';
import { MiscController } from './Controllers/misc/misc.controller';
import { TaskController } from './Controllers/task/task.controller';
import { UserController } from './Controllers/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.70',
      port: 5432,
      password: '820824',
      username: 'angelorafael',
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
    TaskService,
    UserService,
  ],
})
export class AppModule {}
