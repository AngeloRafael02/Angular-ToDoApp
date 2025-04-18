import { Controller, Get, Param } from '@nestjs/common';
import { Categories } from 'src/Entities/categories';
import { Conditions } from 'src/Entities/conditions';
import { Threats } from 'src/Entities/threats';
import { miscService } from 'src/Providers/misc.provider';

@Controller('misc')
export class MiscController {
    constructor(
        private miscService:miscService
    ){}

  @Get('allCat')
  getCategories(): Promise<Categories[]>{
    return this.miscService.findAllCat();
  }

  @Get('allCond')
  getConsditions():Promise<Conditions[]>{
    return this.miscService.findAllCond();
  }

  @Get('allThreats')
  getThreats():Promise<Threats[]>{
    return this.miscService.findAllThreats();
  }

  @Get('col/:table')
  getColumnHeaders(@Param('table') table:string){
    return this.miscService.getColumnNames(table);
  }
}
