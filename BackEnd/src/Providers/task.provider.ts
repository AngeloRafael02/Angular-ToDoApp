import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Task,taskView } from "src/Entities/tasks";
import { Categories } from "src/Entities/categories";
import { User } from "src/Entities/users";
import { Conditions } from "src/Entities/conditions";

@Injectable()
export class taskViewService{
    constructor(
        @InjectRepository(taskView)
        private taskViewRep:Repository<taskView>,

        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(Categories)
        private CatRepository: Repository<Categories>,
        
        @InjectRepository(Conditions)
        private CondRepository: Repository<Conditions>,

        @InjectRepository(User)
        private UserRepository: Repository<User>
    ){}

    public async getAllfromUID(id:number):Promise<taskView[]>{
        return await this.taskViewRep.findBy({UID:id,Status:'Unfinished'});
    }

    public async getOneFromID(id:number):Promise<taskView> {
        return await this.taskViewRep.findOneOrFail({where:{ID:id}});
    }
    
    public async createOne(taskData: Partial<Task> ):Promise<Task>{
        const data = this.taskRepository.create(taskData);
        return await this.taskRepository.save(data); //ISSUE Owner ID isnot detected??
    }

    public async update(id: number, updatedTask: Partial<Omit<Task, 'id'>>):Promise<Task>{
        await this.taskRepository.update(id, updatedTask);
        return await this.taskRepository.findOneOrFail({where:{id:id}});
    }

    public async finishTask(id:number):Promise<UpdateResult>{
        const task = await this.taskRepository.findOneOrFail({where:{id:id}})
        return await this.taskRepository.update(task.id,{stat_id:3});
    }
    
    public async remove(id: number): Promise<void> {
        const task = await this.taskRepository.findOneByOrFail({id:id})// Reuse findOne to check existence
        await this.taskRepository.remove(task);
    }

}