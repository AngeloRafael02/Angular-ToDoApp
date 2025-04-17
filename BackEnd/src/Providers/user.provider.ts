
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from "src/Entities/users";
import { Conditions } from "src/Entities/conditions";

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