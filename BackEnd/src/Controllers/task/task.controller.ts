import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TaskService } from 'src/Providers/psql.provider';
import { Task } from 'src/Entities/tasks';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: TaskService) {} // Inject the TaskService

    @Get()
    findAll(): Promise<Task[]> {
      return this.TaskService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.TaskService.findOne(id);
    }
  
    @Post()
    create(@Body() userData: Partial<Task>): Promise<Task> {
      return this.TaskService.create(userData);
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() userData: Partial<Task>): Promise<Task> {
      return this.TaskService.update(id, userData);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.TaskService.remove(id);
    }
}
