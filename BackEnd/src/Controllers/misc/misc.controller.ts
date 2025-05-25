import { Controller, Get, Header, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { miscPrefix } from 'src/app.enums';
import { Categories } from 'src/Entities/categories';
import { Conditions } from 'src/Entities/conditions';
import { Threats } from 'src/Entities/threats';
import { miscService } from 'src/Providers/misc.provider';

@Controller(miscPrefix.main)
@UseGuards(ThrottlerGuard)
export class MiscController {
    constructor(
        private miscService:miscService
    ){}

  @Get(miscPrefix.allCat)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=3600')
  public getCategories(): Promise<Categories[]>{
    return this.miscService.findAllCat();
  }

  @Get(miscPrefix.allCond)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=3600')
  public getConsditions():Promise<Conditions[]>{
    return this.miscService.findAllCond();
  }

  @Get(miscPrefix.allThreats)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=3600')
  public getThreats():Promise<Threats[]>{
    return this.miscService.findAllThreats();
  }

  @Get(`col/:table`)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=300')
  public getColumnHeaders(@Param('table') table:string){
    return this.miscService.getColumnNames(table);
  }
}
