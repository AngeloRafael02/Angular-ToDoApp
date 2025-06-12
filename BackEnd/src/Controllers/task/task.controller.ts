import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { taskViewService } from 'src/Providers/task.provider';
import { Task, taskView } from 'src/Entities/tasks';
import { UpdateResult } from 'typeorm';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('task')
@UseGuards(ThrottlerGuard)
export class TaskController {
    constructor(private readonly TaskService: taskViewService) {}

    @SkipThrottle()
    @Get('all/:idAll')
    @HttpCode(200)
    public findAll(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllfromUID(id);
    }

    @SkipThrottle()
    @Get('allFinished/:idAll')
    @HttpCode(200)
    public findAllFinished(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllFinishedFromUID(id);
    }

    @SkipThrottle()
    @Get('allCancelled/:idAll')
    @HttpCode(200)
    public findAllCancelled(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllCancelledFromUID(id);
    }
    
    @Get(':idOne')
    @HttpCode(200)
    public findOne(@Param('idOne', ParseIntPipe) id: number): Promise<taskView> {
      return this.TaskService.getOneFromID(id);
    }
  
    @Post()
    @HttpCode(201)
    public create(@Body() taskData: Partial<Task>){
      this.TaskService.createOne(taskData)
    }
  
    @Put(':id')
    @HttpCode(204)
    public update(@Param('id', ParseIntPipe) id: number, @Body() userData: Partial<Task>): Promise<Task> {
      return this.TaskService.update(id, userData);
    }

    @Put('finish/:id')
    @HttpCode(204)
    public finishTask(@Param('id', ParseIntPipe) id: number):Promise<UpdateResult>{
      return this.TaskService.finishTask(id);
    }
  
    @Delete(':id')
    @HttpCode(204)
    public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.TaskService.remove(id);
    }
}
