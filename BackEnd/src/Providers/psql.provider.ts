import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from "src/Entities/tasks";
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

    async findAllCat(): Promise<Categories[]> {
        return this.CatRepository.find();
    }

    async findAllCond(): Promise<Conditions[]> {
        return this.CondRepository.find();
    }
}

@Injectable()
export class TaskService{
    constructor(@InjectRepository(Task)
    private taskRepository: Repository<Task>
    ){}

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async findOne(id:number): Promise<Task> {
        const user = await this.taskRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(userData: Partial<Task>): Promise<Task> {
        const newUser = this.taskRepository.create(userData);
        return this.taskRepository.save(newUser);
    }

    async update(id: number, userData: Partial<Task>): Promise<Task> {
        const user = await this.findOne(id); // Reuse findOne to check existence
        // Important: Avoid overwriting the ID
        delete userData.id;  // or if (userData.hasOwnProperty('id')) delete userData.id;
        Object.assign(user, userData); // Merge the updated data
        return this.taskRepository.save(user);
    }
    
    async remove(id: number): Promise<void> {
        const user = await this.findOne(id); // Reuse findOne to check existence
        await this.taskRepository.remove(user);
    }
}

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(Conditions)
        private UserRepository: Repository<User>
    ){}

    async findAll(): Promise<User[]> {
        return this.UserRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.UserRepository.create(userData);
        return this.UserRepository.save(newUser);
    }
    
    async update(id: number, userData: Partial<User>): Promise<User> {
        const user = await this.findOne(id); // Reuse findOne to check existence
        // Important: Avoid overwriting the ID
        delete userData.id;  // or if (userData.hasOwnProperty('id')) delete userData.id;
        Object.assign(user, userData); // Merge the updated data
        return this.UserRepository.save(user);
    }
    
    async remove(id: number): Promise<void> {
        const user = await this.findOne(id); // Reuse findOne to check existence
        await this.UserRepository.remove(user);
    }
}