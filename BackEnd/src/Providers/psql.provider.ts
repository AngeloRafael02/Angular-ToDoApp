import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task,taskView } from "src/Entities/tasks";
import { Categories } from "src/Entities/categories";
import { User } from "src/Entities/users";
import { Conditions } from "src/Entities/conditions";

@Injectable()
export class miscService{
    constructor(
        @InjectRepository(Categories)
        private CatRepository: Repository<Categories>,
        
        @InjectRepository(Conditions)
        private CondRepository: Repository<Conditions>,
    ) {}

    public async findAllCat(): Promise<Categories[]> {
        return await this.CatRepository.find();
    }

    public async findAllCond(): Promise<Conditions[]> {
        return await this.CondRepository.find();
    }
}

@Injectable()
export class taskViewService{
    constructor(
        @InjectRepository(taskView)
        private taskViewRep:Repository<taskView>,

        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ){}

    public async getAllfromID(id:number):Promise<taskView[]>{
        return await this.taskViewRep.findBy({ID:id})
    }

    public async getOneFromID(id:number):Promise<taskView> {
        return await this.taskViewRep.findOneOrFail({where:{ID:id}})
    }
    
    public async createOne(userData: Partial<Task>):Promise<Task>{
        const newUser = this.taskRepository.create(userData);
        return await this.taskRepository.save(newUser);
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

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(Conditions)
        private UserRepository: Repository<User>
    ){}

    public async findAll(): Promise<User[]> {
        return this.UserRepository.find();
    }

    public async findOne(id: number): Promise<User> {
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    public async create(userData: Partial<User>): Promise<User> {
        const newUser = this.UserRepository.create(userData);
        return this.UserRepository.save(newUser);
    }
    
    public async update(id: number, userData: Partial<User>): Promise<User> {
        const user = await this.findOne(id); // Reuse findOne to check existence
        // Important: Avoid overwriting the ID
        delete userData.id;  // or if (userData.hasOwnProperty('id')) delete userData.id;
        Object.assign(user, userData); // Merge the updated data
        return this.UserRepository.save(user);
    }
    
    public async remove(id: number): Promise<void> {
        const user = await this.findOne(id); // Reuse findOne to check existence
        await this.UserRepository.remove(user);
    }
}