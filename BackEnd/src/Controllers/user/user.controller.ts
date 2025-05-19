import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { UserService } from 'src/Providers/user.provider';
import { User } from 'src/Entities/users';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('user')
@UseGuards(ThrottlerGuard)
export class UserController {
    constructor(private readonly usersService: UserService) {} // Inject the UsersService

  @Get()
  @HttpCode(200)
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  @HttpCode(204)
  public update(@Param('id', ParseIntPipe) id: number, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @HttpCode(204)
  public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
