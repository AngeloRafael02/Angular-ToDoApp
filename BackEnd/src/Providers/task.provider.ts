import { Injectable,Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository, UpdateResult } from 'typeorm';

import { Task,taskView } from "src/Entities/tasks";
import { Categories } from "src/Entities/categories";
import { User } from "src/Entities/users";
import { Conditions } from "src/Entities/conditions";
import { Threats } from 'src/Entities/threats';

@Injectable()
export class taskViewService{
    private logger:Logger = new Logger(taskViewService.name,{timestamp:true})

    constructor(
        @InjectRepository(taskView)
        private taskViewRep:Repository<taskView>,

        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(Categories)
        private CatRepository: Repository<Categories>,
        
        @InjectRepository(Conditions)
        private CondRepository: Repository<Conditions>,

        @InjectRepository(Threats)
        private ThreatRepository:Repository<Threats>,

        @InjectRepository(User)
        private UserRepository: Repository<User>
    ){}

    public async getAllfromUID(id:number):Promise<taskView[]>{
        this.logger.log(`Retrieved All Tasks Based on uid: ${id}`)
        return await this.taskViewRep.find({
            where:{
                UID:id,
                Status:Not(In(['Finished','Cancelled'])),
            }, order:{
                Deadline:'ASC'
            }
        });
    }

    public async getOneFromID(id:number):Promise<taskView> {
        this.logger.log(`Retrieved One Task Based on id: ${id}`)
        return await this.taskViewRep.findOneOrFail({where:{ID:id}});
    }
    
    public async createOne(taskData: Partial<Task> ):Promise<Task>{
        const categoryKey = this.CatRepository.findOne({where:{id:taskData.cat_id}});
        const conditionKey = this.CondRepository.findOne({where:{id:taskData.stat_id}});
        const threatKey = this.ThreatRepository.findOne({where:{id:taskData.threat_id}});
        const userKey = this.UserRepository.findOne({where:{id:taskData.owner_id}});
        if (!categoryKey) {
            this.logger.error("Category Not Found");
            throw new Error("Category Not Found");
        } else if (!conditionKey) {
            this.logger.error("Condition Not Found");
            throw new Error("Condition  Not Found");
        } else if (!threatKey) {
            this.logger.error("Threat Level Not Found");
            throw new Error("Threat Level Not Found");
        } else if (!userKey) {
            this.logger.error("User Not Found");
            throw new Error("User Not Found");
        } else {
            const data = this.taskRepository.create(taskData);
            this.logger.log(`Task: '${taskData.title}' succesfully created`)
            return await this.taskRepository.save(data);
        }
    }

    public async update(id: number, updatedTask: Partial<Omit<Task, 'id'>>):Promise<Task>{
        this.logger.log(`Attempt to update task with ID: ${id}`);
        await this.taskRepository.update(id, updatedTask);
        return await this.taskRepository.findOneOrFail({where:{id:id}});
    }

    public async finishTask(id:number):Promise<UpdateResult>{
        this.logger.log(`Attempt to complete task with ID: ${id}`);
        const task = await this.taskRepository.findOneOrFail({where:{id:id}})
        return await this.taskRepository.update(task.id,{stat_id:3});
    }
    
    public async remove(id: number): Promise<void> {
        this.logger.log(`Attempt to delete task with ID: ${id}`);
        const task = await this.taskRepository.findOneByOrFail({id:id})// Reuse findOne to check existence
        await this.taskRepository.remove(task);
    }

}