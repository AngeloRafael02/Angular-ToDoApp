import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from "src/Entities/tasks";
import { Categories } from "src/Entities/categories";
import { Conditions } from "src/Entities/conditions";
import { Threats } from 'src/Entities/threats';

@Injectable()
export class miscService{
    constructor(
        @InjectRepository(Categories)
        private CatRepository: Repository<Categories>,
        
        @InjectRepository(Conditions)
        private CondRepository: Repository<Conditions>,

        @InjectRepository(Task)
        private TaskRepositoy:Repository<Task>,

        @InjectRepository(Threats)
        private Threatrepository:Repository<Threats>
    ) {}

    public async findAllCat(): Promise<Categories[]> {
        return await this.CatRepository.find();
    }

    public async findAllCond(): Promise<Conditions[]> {
        return await this.CondRepository.find();
    }

    public async findAllThreats(){
        return await this.Threatrepository.find();
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
                WHEN 'Threat Level' THEN 6
                WHEN 'Status' THEN 7
                WHEN 'Deadline' THEN 8
                WHEN 'Created At' THEN 9
                WHEN 'Last Edited' THEN 10
                ELSE 11 -- For any other columns
            END
        `,[tableName]);
        return rawData.map((row) => row.column_name);
      }
}


