import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/Entities/tasks";
import { task_logs } from "src/Entities/tasks_trigger";
import { Repository } from "typeorm";

@Injectable()
export class triggerService {

    constructor(
        @InjectRepository(task_logs)
        private triggerRepo:Repository<task_logs>
    ){}

    public async taskLog(
        mode:string,
        task:Task
    ):Promise<task_logs>{
        const data = this.triggerRepo.create({
            taskID:task.id,
            taskName:task.title,
            taskCatID:task.cat_id,
            taskStatID:task.stat_id,
            taskThreatID:task.threat_id
        });
        return await this.triggerRepo.save(data);
    }
}