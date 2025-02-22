import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

import { User } from './Entities/users';
import { Conditions } from './Entities/conditions';
import { Categories } from './Entities/categories';
import { Task } from './Entities/tasks';

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
        Categories
        ],
      database: 'tododb',
      synchronize: true,
      logging: true,
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
