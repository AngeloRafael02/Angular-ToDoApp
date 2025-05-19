
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from "src/Entities/users";
import { Conditions } from "src/Entities/conditions";

@Injectable()
export class UserService{
    private logger:Logger = new Logger(UserService.name,{timestamp:true})

    constructor(
        @InjectRepository(Conditions)
        private UserRepository: Repository<User>
    ){}

    public async findAll(): Promise<User[]> {
        this.logger.log('All Users Requested');
        return this.UserRepository.find();
    }

    public async findOne(id: number): Promise<User> {
        this.logger.log(`One Users Requested: ${id}`);
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    public async create(userData: Partial<User>): Promise<User> {
        this.logger.log(`User ${userData.firstName} ${userData.lastName}, was Created`)
        const newUser = this.UserRepository.create(userData);
        return this.UserRepository.save(newUser);
    }
    
    public async update(id: number, userData: Partial<User>): Promise<User> {
        this.logger.log(`Attempt on Updating User ID: ${id}`);
        const user = await this.findOne(id); // Reuse findOne to check existence
        // Important: Avoid overwriting the ID
        delete userData.id;  // or if (userData.hasOwnProperty('id')) delete userData.id;
        Object.assign(user, userData); // Merge the updated data
        return this.UserRepository.save(user);
    }
    
    public async remove(id: number): Promise<void> {
        this.logger.log(`Attempt on Deleting User ID: ${id}`);
        const user = await this.findOne(id); // Reuse findOne to check existence
        await this.UserRepository.remove(user);
    }
}