import { ConfigModule, ConfigService } from '@nestjs/config';
import { Operation } from 'src/entities/Operation';
import { User } from 'src/entities/User';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: ['.env'],
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Operation],
  synchronize: true,
};

export const AppDS = new DataSource(DataSourceConfig);
