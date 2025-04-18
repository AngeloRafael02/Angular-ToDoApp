import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { taskViewService } from 'src/Providers/task.provider';
import { Task, taskView } from 'src/Entities/tasks';
import { UpdateResult } from 'typeorm';

@Controller('task')
export class TaskController {
    constructor(private readonly TaskService: taskViewService) {}

    @Get('all/:idAll')
    findAll(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllfromUID(id);
    }
  
    @Get(':idOne')
    findOne(@Param('idOne', ParseIntPipe) id: number): Promise<taskView> {
      return this.TaskService.getOneFromID(id);
    }
  
    @Post()
    create(@Body() taskData: Partial<Task>){
      this.TaskService.createOne(taskData)
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() userData: Partial<Task>): Promise<Task> {
      return this.TaskService.update(id, userData);
    }

    @Put('finish/:id')
    finishTask(@Param('id', ParseIntPipe)id:number):Promise<UpdateResult>{
      return this.TaskService.finishTask(id);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.TaskService.remove(id);
    }
}
