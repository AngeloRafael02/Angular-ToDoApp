import { Injectable, OnApplicationBootstrap,OnApplicationShutdown, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { miscService } from './misc.provider';
import { Categories } from 'src/Entities/categories';
import { Conditions } from 'src/Entities/conditions';
import { Threats } from 'src/Entities/threats';

@Injectable()
export class cachingService implements OnApplicationBootstrap,OnApplicationShutdown {
    private logger:Logger = new Logger(cachingService.name,{ timestamp:true })
    
    constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly miscService: miscService,
    ) {

    }

    async onApplicationShutdown():Promise<void>  {
        await this.cacheManager.clear();
        this.logger.log('Cache is Cleared')
    }

    async onApplicationBootstrap():Promise<void>  {
        await this.initializeCache();
    }

    private async initializeCache():Promise<void> {
        try {
            const setAllCat:Categories[] = await this.miscService.findAllCat()
            await this.cacheManager.set('allCat', setAllCat ,0);
            const setAllCond:Conditions[] = await this.miscService.findAllCond()
            await this.cacheManager.set('allCond', setAllCond ,0);
            const setAllTL:Threats[] = await this.miscService.findAllThreats()
            await this.cacheManager.set('allThreats', setAllTL,0);
        } catch (error) {
            this.logger.error('Error caching all todos:', error);
            console.error('Error caching all todos:', error);
        }
    }
    
}