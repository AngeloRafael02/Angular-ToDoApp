import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        return await this.taskViewRep.findBy({UID:id});
    }

    public async getOneFromID(id:number):Promise<taskView> {
        return await this.taskViewRep.findOneOrFail({where:{ID:id}});
    }
    
    public async createOne(taskData: Task ):Promise<Task>{
        const data = this.taskRepository.create(taskData)
        return await this.taskRepository.save(data); //ISSUE Owner ID isnot detected??
    }

    public async update(id: number, updatedTask: Partial<Omit<Task, 'id'>>):Promise<Partial<Omit<Task, "id">> & Task>{
        const user = await this.taskRepository.findOneByOrFail({id:id})
        Object.assign(user,updatedTask)
        return this.taskRepository.save(updatedTask)
    }
    
    public async remove(id: number): Promise<void> {
        const user = await this.taskRepository.findOneByOrFail({id:id})// Reuse findOne to check existence
        await this.taskRepository.remove(user);
    }
}