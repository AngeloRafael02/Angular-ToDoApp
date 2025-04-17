import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from "src/Entities/tasks";
import { Categories } from "src/Entities/categories";
import { Conditions } from "src/Entities/conditions";

@Injectable()
export class miscService{
    constructor(
        @InjectRepository(Categories)
        private CatRepository: Repository<Categories>,
        
        @InjectRepository(Conditions)
        private CondRepository: Repository<Conditions>,

        @InjectRepository(Task)
        private TaskRepositoy:Repository<Task>
    ) {}

    public async findAllCat(): Promise<Categories[]> {
        return await this.CatRepository.find();
    }

    public async findAllCond(): Promise<Conditions[]> {
        return await this.CondRepository.find();
    }

    async getColumnNames(tableName: string): Promise<string[]> {
        const queryBuilder = this.TaskRepositoy.createQueryBuilder();
        const rawData = await queryBuilder.connection.query(`
          SELECT column_name
          FROM information_schema.columns
          WHERE table_name = $1
          ORDER BY 
            CASE column_name
                WHEN 'ID' THEN 1
                WHEN 'Title' THEN 2
                WHEN 'Description' THEN 3
                WHEN 'Category' THEN 4
                WHEN 'Priority' THEN 5
                WHEN 'Status' THEN 6
                WHEN 'Deadline' THEN 7
                WHEN 'Created At' THEN 8
                WHEN 'Last Edited' THEN 9
                ELSE 10 -- For any other columns
            END
        `,[tableName]);
        return rawData.map((row) => row.column_name);
      }
}


