import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from "src/Entities/tasks";
import { Repository } from 'typeorm';
import { Categories } from "src/Entities/categories";
import { Conditions } from "src/Entities/conditions";
import { Threats } from "src/Entities/threats";

export class statObject {
    id:number;
    column:string;
}

@Injectable()
export class statsService{

    constructor(
        @InjectRepository(Task)
        private TaskRepository:Repository<Task>
    ){}

    public async getCategoryGrouped(id:number):Promise<{name:string, value:number}[]>{
        const result = await this.TaskRepository
            .createQueryBuilder('t') 
            .innerJoin(Categories, 'c', 't.cat_id = c.id') 
            .select('c.cat', 'name') 
            .addSelect('COUNT(t.cat_id)', 'value') 
            .where('t.stat_id NOT IN (:...statids)', { statids: [3, 4] }) 
            .andWhere('t.owner_id = :ownerId', { ownerId: id })
            .groupBy('t.cat_id') 
            .addGroupBy('c.cat') 
            .getRawMany(); 
        return result;
    }

    public async getConditionGrouped(id:number):Promise<{name:string, value:number}[]>{
        const result = await this.TaskRepository
            .createQueryBuilder('t') 
            .innerJoin(Conditions, 'c', 't.stat_id = c.id') 
            .select('c.stat', 'name') 
            .addSelect('COUNT(t.stat_id)', 'value') 
            .where('t.owner_id = :ownerId', { ownerId: id })
            .groupBy('t.stat_id') 
            .addGroupBy('c.stat') 
            .getRawMany(); 
        return result;
    }

    public async getThreatLevelGrouped(id:number):Promise<{name:string, value:number}[]>{
        const result = await this.TaskRepository
            .createQueryBuilder('t') 
            .innerJoin(Threats, 'c', 't.threat_id = c.id') 
            .select('c.level', 'name') 
            .addSelect('COUNT(t.threat_id)', 'value') 
            .where('t.stat_id NOT IN (:...statids)', { statids: [3, 4] }) 
            .andWhere('t.owner_id = :ownerId', { ownerId: id })
            .groupBy('t.threat_id') 
            .addGroupBy('c.level') 
            .getRawMany(); 
        return result;
    }
}