import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
 imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger:Logger = new Logger('DatabaseModule', { timestamp: true });
        const createDataSource:(options: DataSourceOptions) => Promise<DataSource> = async (options: DataSourceOptions): Promise<DataSource> => {
            const dataSource:DataSource = new DataSource(options);
            try {
                await dataSource.initialize();
                return dataSource;
            } catch (error) {
                logger.error(`Error connecting to database (ENOTFOUND): ${error.message}`, undefined, 'DataSourceInitialization');
                throw error;
            }
        };
        try {
          logger.log('Attempting to connect to the primary database...');
          logger.log(__dirname);
          const primaryConfig: DataSourceOptions = {
            type: 'postgres',
            host: configService.get<string>('HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('USERNAME'),
            password: configService.get<string>('PASSWORD'),
            database: configService.get<string>('DB'),
            entities: [__dirname + '/Entities/*{.ts,.js}'],
            synchronize: true,
            logging:true,
          };
          const primaryDataSource = await createDataSource(primaryConfig); //used to check if connection works, error here is catched
          logger.log('Successfully connected to the primary database.');
          return primaryConfig;
        } catch (primaryError) {
          logger.error('Failed to connect to the primary database:', primaryError);
          logger.log('Attempting to connect to the secondary database...');
          try {
            const secondaryConfig: DataSourceOptions = {
              type: 'postgres',
              host: configService.get<string>('HOST'),
              url:configService.get<string>('NEON_DB_CONNECTION_STRING'),
              entities: [__dirname + '/Entities/*{.ts,.js}'],
              synchronize: true,
              logging:true
            };
            logger.log('Successfully connected to the secondary database.');
            return secondaryConfig;
          } catch (secondaryError) {
            logger.error('Failed to connect to the secondary database:', secondaryError);
            logger.error('Failed to connect to either primary or secondary database.');
            throw new Error('Failed to connect to either primary or secondary database.');
          }
        }
      },
    }),
  ],
})
export class DatabaseModule {}