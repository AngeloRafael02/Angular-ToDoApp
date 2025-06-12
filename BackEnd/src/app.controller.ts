import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { statsService } from './Providers/stats.provider';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly statsService:statsService
  ) {}

  @Get()
  getPing(): string {
    return this.appService.ping();
  }

  @Get('test')
  public async getTest():Promise<unknown> {
    return await this.statsService.getConditionGrouped(1);
  }
}
