import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { taskViewService} from 'src/Providers/psql.provider';
import { Task, taskView } from 'src/Entities/tasks';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: taskViewService) {}

    @Get('all/:idAll')
    findAll(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllfromID(id);
    }
  
    @Get(':idOne')
    findOne(@Param('idOne', ParseIntPipe) id: number): Promise<taskView> {
      return this.TaskService.getOneFromID(id);
    }
  
    @Post()
    create(@Body() userData: Partial<Task>): Promise<Task> {
      return this.TaskService.createOne(userData)
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
